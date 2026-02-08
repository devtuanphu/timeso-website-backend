#!/usr/bin/env python3
"""
Convert SQLite data.db to PostgreSQL-compatible .sql dump.
Handles: timestamp conversion (epoch ms → ISO), boolean conversion, proper escaping.
"""

import sqlite3
import sys
import os
from datetime import datetime, timezone

DB_PATH = os.path.join(os.path.dirname(__file__), '.tmp/data.db')
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), 'strapi_data_only.sql')

TIMESTAMP_COLS = {'created_at', 'updated_at', 'published_at', 'expires_at', 'prefill_at', 'last_login_at', 'token_expires_at', 'executed_at', 'released_at', 'scheduled_at'}

def escape_pg(value):
    if value is None:
        return 'NULL'
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, bytes):
        return "E'\\\\x" + value.hex() + "'"
    s = str(value).replace("'", "''")
    return f"'{s}'"

def is_epoch_ms(val):
    """Check if a value looks like epoch milliseconds (13 digits, reasonable range)"""
    try:
        n = int(val)
        return 1000000000000 <= n <= 9999999999999
    except (ValueError, TypeError):
        return False

def epoch_to_timestamp(val):
    """Convert epoch milliseconds to PostgreSQL timestamp string"""
    try:
        n = int(val)
        dt = datetime.fromtimestamp(n / 1000.0, tz=timezone.utc)
        return f"'{dt.strftime('%Y-%m-%d %H:%M:%S.%f')[:-3]}'"
    except (ValueError, TypeError, OSError):
        return escape_pg(val)

def main():
    if not os.path.exists(DB_PATH):
        print(f"Error: {DB_PATH} not found")
        sys.exit(1)

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
    tables = [row[0] for row in cursor.fetchall()]

    print(f"Found {len(tables)} tables")

    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write(f"-- Strapi Data Import (INSERT only)\n")
        f.write(f"-- Generated: {datetime.now().isoformat()}\n")
        f.write(f"-- Source: {DB_PATH}\n\n")
        f.write("SET client_encoding = 'UTF8';\n")
        f.write("SET standard_conforming_strings = on;\n\n")

        # Truncate all tables first
        f.write("-- Truncate all tables\n")
        # Reverse order to respect FK constraints
        for table_name in reversed(tables):
            f.write(f'TRUNCATE TABLE "{table_name}" CASCADE;\n')
        f.write('\n')

        for table_name in tables:
            cursor.execute(f"PRAGMA table_info('{table_name}')")
            columns = cursor.fetchall()
            if not columns:
                continue

            col_names = [col[1] for col in columns]
            col_types_raw = [col[2].upper() for col in columns]

            # Detect which columns are timestamps
            ts_indices = set()
            for i, name in enumerate(col_names):
                if name in TIMESTAMP_COLS or 'DATETIME' in col_types_raw[i] or 'TIMESTAMP' in col_types_raw[i]:
                    ts_indices.add(i)

            # Detect boolean columns
            bool_indices = set()
            for i, t in enumerate(col_types_raw):
                if 'BOOL' in t:
                    bool_indices.add(i)

            cursor.execute(f'SELECT * FROM "{table_name}"')
            rows = cursor.fetchall()

            if not rows:
                continue

            col_names_quoted = ', '.join([f'"{c}"' for c in col_names])

            f.write(f"-- {table_name} ({len(rows)} rows)\n")
            for row in rows:
                values = []
                for i, val in enumerate(row):
                    if val is None:
                        values.append('NULL')
                    elif i in ts_indices:
                        if is_epoch_ms(val):
                            values.append(epoch_to_timestamp(val))
                        elif val == '' or val == 0:
                            values.append('NULL')
                        else:
                            values.append(escape_pg(str(val)))
                    elif i in bool_indices:
                        values.append('true' if val in (1, '1', True, 'true') else 'false')
                    else:
                        values.append(escape_pg(val))

                f.write(f'INSERT INTO "{table_name}" ({col_names_quoted}) VALUES ({", ".join(values)});\n')

            # Reset sequence
            if col_names[0] == 'id':
                f.write(f"SELECT setval(pg_get_serial_sequence('{table_name}', 'id'), COALESCE((SELECT MAX(id) FROM \"{table_name}\"), 0) + 1, false);\n")

            f.write('\n')

        f.write("-- Done.\n")

    conn.close()
    sz = os.path.getsize(OUTPUT_PATH)
    print(f"\n✅ Output: {OUTPUT_PATH} ({sz / 1024:.1f} KB)")

if __name__ == '__main__':
    main()
