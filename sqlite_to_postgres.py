#!/usr/bin/env python3
"""
Convert SQLite data.db to PostgreSQL-compatible .sql dump.
Usage: python3 sqlite_to_postgres.py
"""

import sqlite3
import sys
import os
import re
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), '.tmp/data.db')
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), 'strapi_postgres_dump.sql')

def escape_pg(value):
    """Escape a value for PostgreSQL"""
    if value is None:
        return 'NULL'
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, bytes):
        # Convert bytes to hex for bytea
        return "E'\\\\x" + value.hex() + "'"
    # String — escape single quotes
    s = str(value).replace("'", "''")
    # Escape backslashes
    s = s.replace('\\', '\\\\')
    return f"E'{s}'"

def get_pg_type(sqlite_type, col_name):
    """Map SQLite types to PostgreSQL types"""
    t = (sqlite_type or '').upper()
    if 'INT' in t:
        if 'AUTOINCREMENT' in t or col_name == 'id':
            return 'SERIAL'
        return 'INTEGER'
    if 'REAL' in t or 'FLOAT' in t or 'DOUBLE' in t or 'NUMERIC' in t or 'DECIMAL' in t:
        return 'DOUBLE PRECISION'
    if 'BOOL' in t:
        return 'BOOLEAN'
    if 'BLOB' in t:
        return 'BYTEA'
    if 'DATE' in t or 'TIME' in t:
        return 'TIMESTAMP'
    if 'JSON' in t:
        return 'JSONB'
    if 'TEXT' in t or 'CHAR' in t or 'CLOB' in t or 'VARCHAR' in t:
        return 'TEXT'
    return 'TEXT'

def main():
    if not os.path.exists(DB_PATH):
        print(f"Error: {DB_PATH} not found")
        sys.exit(1)

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    # Get all tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
    tables = [row[0] for row in cursor.fetchall()]

    print(f"Found {len(tables)} tables")

    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write(f"-- Strapi SQLite to PostgreSQL dump\n")
        f.write(f"-- Generated: {datetime.now().isoformat()}\n")
        f.write(f"-- Source: {DB_PATH}\n\n")
        f.write("SET client_encoding = 'UTF8';\n")
        f.write("SET standard_conforming_strings = on;\n\n")

        for table_name in tables:
            print(f"  Processing: {table_name}")

            # Get table schema
            cursor.execute(f"PRAGMA table_info('{table_name}')")
            columns = cursor.fetchall()

            if not columns:
                continue

            # DROP TABLE
            f.write(f"-- ===== {table_name} =====\n")
            f.write(f"DROP TABLE IF EXISTS \"{table_name}\" CASCADE;\n")

            # CREATE TABLE
            col_defs = []
            has_id = False
            for col in columns:
                col_name = col[1]
                col_type = col[2]
                not_null = col[3]
                default_val = col[4]
                is_pk = col[5]

                pg_type = get_pg_type(col_type, col_name)

                if col_name == 'id' and is_pk:
                    has_id = True
                    col_defs.append(f'  "{col_name}" SERIAL PRIMARY KEY')
                else:
                    parts = [f'  "{col_name}" {pg_type}']
                    if not_null and not is_pk:
                        parts.append('NOT NULL')
                    if default_val is not None and not is_pk:
                        # Convert SQLite defaults
                        dv = str(default_val)
                        if dv.lower() in ('null', 'none'):
                            pass
                        elif pg_type == 'BOOLEAN':
                            parts.append(f"DEFAULT {'true' if dv in ('1', 'true', 'TRUE') else 'false'}")
                        else:
                            parts.append(f"DEFAULT {escape_pg(default_val)}")
                    col_defs.append(' '.join(parts))

            f.write(f"CREATE TABLE \"{table_name}\" (\n")
            f.write(',\n'.join(col_defs))
            f.write('\n);\n\n')

            # Get data
            cursor.execute(f'SELECT * FROM "{table_name}"')
            rows = cursor.fetchall()

            if not rows:
                f.write(f"-- No data in {table_name}\n\n")
                continue

            col_names = [col[1] for col in columns]
            col_names_quoted = ', '.join([f'"{c}"' for c in col_names])

            # Insert data
            f.write(f"-- Data for {table_name} ({len(rows)} rows)\n")
            for row in rows:
                values = []
                for i, val in enumerate(row):
                    col_name = col_names[i]
                    col_type = get_pg_type(columns[i][2], col_name)
                    
                    if val is None:
                        values.append('NULL')
                    elif col_type == 'BOOLEAN':
                        values.append('true' if val in (1, '1', True, 'true') else 'false')
                    elif col_type in ('INTEGER', 'SERIAL', 'DOUBLE PRECISION'):
                        values.append(str(val))
                    elif col_type == 'JSONB' and val:
                        values.append(escape_pg(str(val)) + '::jsonb')
                    else:
                        values.append(escape_pg(val))

                f.write(f"INSERT INTO \"{table_name}\" ({col_names_quoted}) VALUES ({', '.join(values)});\n")

            # Reset sequence for id columns
            if has_id:
                f.write(f"\nSELECT setval(pg_get_serial_sequence('\"{table_name}\"', 'id'), COALESCE((SELECT MAX(id) FROM \"{table_name}\"), 0) + 1, false);\n")

            f.write('\n')

        f.write("-- Done.\n")

    conn.close()
    file_size = os.path.getsize(OUTPUT_PATH)
    print(f"\n✅ Output: {OUTPUT_PATH}")
    print(f"   Size: {file_size / 1024:.1f} KB")
    print(f"   Tables: {len(tables)}")

if __name__ == '__main__':
    main()
