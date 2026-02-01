import type { Schema, Struct } from "@strapi/strapi";

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: "strapi_api_tokens";
  info: {
    description: "";
    displayName: "Api Token";
    name: "Api Token";
    pluralName: "api-tokens";
    singularName: "api-token";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<"">;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "admin::api-token"> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<"oneToMany", "admin::api-token-permission">;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<["read-only", "full-access", "custom"]> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"read-only">;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: "strapi_api_token_permissions";
  info: {
    description: "";
    displayName: "API Token Permission";
    name: "API Token Permission";
    pluralName: "api-token-permissions";
    singularName: "api-token-permission";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "admin::api-token-permission"> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<"manyToOne", "admin::api-token">;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: "admin_permissions";
  info: {
    description: "";
    displayName: "Permission";
    name: "Permission";
    pluralName: "permissions";
    singularName: "permission";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "admin::permission"> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<"manyToOne", "admin::role">;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: "admin_roles";
  info: {
    description: "";
    displayName: "Role";
    name: "Role";
    pluralName: "roles";
    singularName: "role";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "admin::role"> & Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<"oneToMany", "admin::permission">;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    users: Schema.Attribute.Relation<"manyToMany", "admin::user">;
  };
}

export interface AdminSession extends Struct.CollectionTypeSchema {
  collectionName: "strapi_sessions";
  info: {
    description: "Session Manager storage";
    displayName: "Session";
    name: "Session";
    pluralName: "sessions";
    singularName: "session";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
    i18n: {
      localized: false;
    };
  };
  attributes: {
    absoluteExpiresAt: Schema.Attribute.DateTime & Schema.Attribute.Private;
    childId: Schema.Attribute.String & Schema.Attribute.Private;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    deviceId: Schema.Attribute.String & Schema.Attribute.Required & Schema.Attribute.Private;
    expiresAt: Schema.Attribute.DateTime & Schema.Attribute.Required & Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "admin::session"> &
      Schema.Attribute.Private;
    origin: Schema.Attribute.String & Schema.Attribute.Required & Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sessionId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique;
    status: Schema.Attribute.String & Schema.Attribute.Private;
    type: Schema.Attribute.String & Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    userId: Schema.Attribute.String & Schema.Attribute.Required & Schema.Attribute.Private;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: "strapi_transfer_tokens";
  info: {
    description: "";
    displayName: "Transfer Token";
    name: "Transfer Token";
    pluralName: "transfer-tokens";
    singularName: "transfer-token";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<"">;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "admin::transfer-token"> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<"oneToMany", "admin::transfer-token-permission">;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: "strapi_transfer_token_permissions";
  info: {
    description: "";
    displayName: "Transfer Token Permission";
    name: "Transfer Token Permission";
    pluralName: "transfer-token-permissions";
    singularName: "transfer-token-permission";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "admin::transfer-token-permission"> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<"manyToOne", "admin::transfer-token">;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: "admin_users";
  info: {
    description: "";
    displayName: "User";
    name: "User";
    pluralName: "users";
    singularName: "user";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "admin::user"> & Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<"manyToMany", "admin::role"> & Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiBaiVietBaiViet extends Struct.CollectionTypeSchema {
  collectionName: "bai_viets";
  info: {
    description: "Blog posts";
    displayName: "B\u00E0i Vi\u1EBFt";
    pluralName: "bai-viets";
    singularName: "bai-viet";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    danh_muc: Schema.Attribute.Enumeration<
      ["quan-tri-nhan-su", "cong-nghe-ai", "quan-ly-hieu-suat", "quan-ly-du-lieu"]
    > &
      Schema.Attribute.DefaultTo<"quan-tri-nhan-su">;
    hinh_dai_dien: Schema.Attribute.Media<"images">;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "api::bai-viet.bai-viet"> &
      Schema.Attribute.Private;
    mo_ta: Schema.Attribute.Text;
    noi_bat: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    noi_dung: Schema.Attribute.RichText;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<"shared.seo-meta", false>;
    slug: Schema.Attribute.UID<"tieu_de"> & Schema.Attribute.Required;
    tac_gia: Schema.Attribute.String;
    tags: Schema.Attribute.JSON;
    tieu_de: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface ApiCaseStudyCaseStudy extends Struct.CollectionTypeSchema {
  collectionName: "case_studies";
  info: {
    description: "Customer success stories";
    displayName: "Case Study";
    pluralName: "case-studies";
    singularName: "case-study";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    hinh_dai_dien: Schema.Attribute.Media<"images">;
    ket_qua: Schema.Attribute.JSON;
    khach_hang: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "api::case-study.case-study"> &
      Schema.Attribute.Private;
    mo_ta: Schema.Attribute.Text;
    nganh: Schema.Attribute.String;
    noi_dung: Schema.Attribute.RichText;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<"shared.seo-meta", false>;
    slug: Schema.Attribute.UID<"tieu_de"> & Schema.Attribute.Required;
    tieu_de: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface ApiChamCongChamCong extends Struct.SingleTypeSchema {
  collectionName: "cham_congs";
  info: {
    description: "N\u1ED9i dung trang Ch\u1EA5m C\u00F4ng";
    displayName: "Ch\u1EA5m C\u00F4ng";
    pluralName: "cham-congs";
    singularName: "cham-cong";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    cta: Schema.Attribute.Component<"sections.cta-section", false>;
    da_linh_vuc: Schema.Attribute.Component<"sections.da-linh-vuc", false>;
    hero: Schema.Attribute.Component<"sections.hero-section", false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "api::cham-cong.cham-cong"> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<"shared.seo-meta", false>;
    tinh_nang: Schema.Attribute.Component<"sections.feature-card", true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    why_choose: Schema.Attribute.Component<"sections.why-choose", false>;
  };
}

export interface ApiDoiTacDoiTac extends Struct.CollectionTypeSchema {
  collectionName: "doi_tacs";
  info: {
    description: "Partner logos";
    displayName: "\u0110\u1ED1i T\u00E1c";
    pluralName: "doi-tacs";
    singularName: "doi-tac";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "api::doi-tac.doi-tac"> &
      Schema.Attribute.Private;
    logo: Schema.Attribute.Media<"images"> & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    ten: Schema.Attribute.String & Schema.Attribute.Required;
    thu_tu: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    website: Schema.Attribute.String;
  };
}

export interface ApiKhachHangKhachHang extends Struct.CollectionTypeSchema {
  collectionName: "khach_hangs";
  info: {
    description: "Testimonials t\u1EEB kh\u00E1ch h\u00E0ng";
    displayName: "Kh\u00E1ch H\u00E0ng";
    pluralName: "khach-hangs";
    singularName: "khach-hang";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    avatar: Schema.Attribute.Media<"images">;
    chuc_vu: Schema.Attribute.String;
    cong_ty: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "api::khach-hang.khach-hang"> &
      Schema.Attribute.Private;
    logo_cong_ty: Schema.Attribute.Media<"images">;
    noi_dung: Schema.Attribute.Text & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    so_sao: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    ten: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface ApiLienHeLienHe extends Struct.SingleTypeSchema {
  collectionName: "lien_hes";
  info: {
    description: "N\u1ED9i dung trang Li\u00EAn H\u1EC7";
    displayName: "Li\u00EAn H\u1EC7";
    pluralName: "lien-hes";
    singularName: "lien-he";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    ban_do_url: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    dia_chi: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    gio_lam_viec: Schema.Attribute.Text;
    hero: Schema.Attribute.Component<"sections.hero-section", false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "api::lien-he.lien-he"> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<"shared.seo-meta", false>;
    so_dien_thoai: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface ApiQuanLyDonHangQuanLyDonHang extends Struct.SingleTypeSchema {
  collectionName: "quan_ly_don_hangs";
  info: {
    description: "N\u1ED9i dung trang Qu\u1EA3n L\u00FD \u0110\u01A1n H\u00E0ng";
    displayName: "Qu\u1EA3n L\u00FD \u0110\u01A1n H\u00E0ng";
    pluralName: "quan-ly-don-hangs";
    singularName: "quan-ly-don-hang";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    cta: Schema.Attribute.Component<"sections.cta-section", false>;
    da_linh_vuc: Schema.Attribute.Component<"sections.da-linh-vuc", false>;
    hero: Schema.Attribute.Component<"sections.hero-section", false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      "oneToMany",
      "api::quan-ly-don-hang.quan-ly-don-hang"
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<"shared.seo-meta", false>;
    tinh_nang: Schema.Attribute.Component<"sections.feature-card", true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface ApiQuanLyNhanSuQuanLyNhanSu extends Struct.SingleTypeSchema {
  collectionName: "quan_ly_nhan_sus";
  info: {
    description: "N\u1ED9i dung trang Qu\u1EA3n L\u00FD Nh\u00E2n S\u1EF1";
    displayName: "Qu\u1EA3n L\u00FD Nh\u00E2n S\u1EF1";
    pluralName: "quan-ly-nhan-sus";
    singularName: "quan-ly-nhan-su";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    cta: Schema.Attribute.Component<"sections.cta-section", false>;
    da_linh_vuc: Schema.Attribute.Component<"sections.da-linh-vuc", false>;
    hero: Schema.Attribute.Component<"sections.hero-section", false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "api::quan-ly-nhan-su.quan-ly-nhan-su"> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<"shared.seo-meta", false>;
    tinh_nang: Schema.Attribute.Component<"sections.feature-card", true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    why_choose: Schema.Attribute.Component<"sections.why-choose", false>;
  };
}

export interface ApiQuanLyTaiSanQuanLyTaiSan extends Struct.SingleTypeSchema {
  collectionName: "quan_ly_tai_sans";
  info: {
    description: "N\u1ED9i dung trang Qu\u1EA3n L\u00FD T\u00E0i S\u1EA3n";
    displayName: "Qu\u1EA3n L\u00FD T\u00E0i S\u1EA3n";
    pluralName: "quan-ly-tai-sans";
    singularName: "quan-ly-tai-san";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    cta: Schema.Attribute.Component<"sections.cta-section", false>;
    da_linh_vuc: Schema.Attribute.Component<"sections.da-linh-vuc", false>;
    hero: Schema.Attribute.Component<"sections.hero-section", false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "api::quan-ly-tai-san.quan-ly-tai-san"> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<"shared.seo-meta", false>;
    tinh_nang: Schema.Attribute.Component<"sections.feature-card", true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    why_choose: Schema.Attribute.Component<"sections.why-choose", false>;
  };
}

export interface ApiSapCaThongMinhSapCaThongMinh extends Struct.SingleTypeSchema {
  collectionName: "sap_ca_thong_minhs";
  info: {
    description: "N\u1ED9i dung trang S\u1EAFp Ca Th\u00F4ng Minh";
    displayName: "S\u1EAFp Ca Th\u00F4ng Minh";
    pluralName: "sap-ca-thong-minhs";
    singularName: "sap-ca-thong-minh";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    cta: Schema.Attribute.Component<"sections.cta-section", false>;
    da_linh_vuc: Schema.Attribute.Component<"sections.da-linh-vuc", false>;
    hero: Schema.Attribute.Component<"sections.hero-section", false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      "oneToMany",
      "api::sap-ca-thong-minh.sap-ca-thong-minh"
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<"shared.seo-meta", false>;
    tinh_nang: Schema.Attribute.Component<"sections.feature-card", true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    why_choose: Schema.Attribute.Component<"sections.why-choose", false>;
  };
}

export interface ApiThanhVienThanhVien extends Struct.CollectionTypeSchema {
  collectionName: "thanh_viens";
  info: {
    description: "Team members";
    displayName: "Th\u00E0nh Vi\u00EAn";
    pluralName: "thanh-viens";
    singularName: "thanh-vien";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    avatar: Schema.Attribute.Media<"images">;
    chuc_vu: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "api::thanh-vien.thanh-vien"> &
      Schema.Attribute.Private;
    mo_ta: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    ten: Schema.Attribute.String & Schema.Attribute.Required;
    thu_tu: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface ApiTrangBlogTrangBlog extends Struct.SingleTypeSchema {
  collectionName: "trang_blogs";
  info: {
    description: "N\u1ED9i dung trang danh s\u00E1ch Blog";
    displayName: "Trang Blog";
    pluralName: "trang-blogs";
    singularName: "trang-blog";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    hero: Schema.Attribute.Component<"sections.hero-section", false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "api::trang-blog.trang-blog"> &
      Schema.Attribute.Private;
    mo_ta_trang: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<"shared.seo-meta", false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface ApiTrangCaseStudyTrangCaseStudy extends Struct.SingleTypeSchema {
  collectionName: "trang_case_studies";
  info: {
    description: "N\u1ED9i dung trang danh s\u00E1ch Case Study";
    displayName: "Trang Case Study";
    pluralName: "trang-case-studies";
    singularName: "trang-case-study";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    hero: Schema.Attribute.Component<"sections.hero-section", false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      "oneToMany",
      "api::trang-case-study.trang-case-study"
    > &
      Schema.Attribute.Private;
    mo_ta_trang: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<"shared.seo-meta", false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface ApiTrangChuTrangChu extends Struct.SingleTypeSchema {
  collectionName: "trang_chus";
  info: {
    description: "N\u1ED9i dung trang ch\u1EE7";
    displayName: "Trang Ch\u1EE7";
    pluralName: "trang-chus";
    singularName: "trang-chu";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    ai_section: Schema.Attribute.Component<"sections.ai-section", false>;
    all_in_one: Schema.Attribute.Component<"sections.all-in-one", false>;
    bai_viet_noi_bat: Schema.Attribute.Relation<"oneToMany", "api::bai-viet.bai-viet">;
    comparison: Schema.Attribute.Component<"sections.comparison", false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    cta: Schema.Attribute.Component<"sections.cta-section", false>;
    cyan_banner: Schema.Attribute.Component<"sections.cyan-banner", false>;
    hero: Schema.Attribute.Component<"sections.hero-section", false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "api::trang-chu.trang-chu"> &
      Schema.Attribute.Private;
    pricing: Schema.Attribute.Component<"sections.pricing-section", false>;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<"shared.seo-meta", false>;
    target_audience: Schema.Attribute.Component<"sections.target-audience", false>;
    testimonials: Schema.Attribute.Component<"sections.testimonials", false>;
    trusted_by: Schema.Attribute.Component<"sections.trusted-by", false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    user_stories: Schema.Attribute.Component<"sections.user-stories", false>;
    why_choose: Schema.Attribute.Component<"sections.why-choose", false>;
  };
}

export interface ApiTuyenDungTuyenDung extends Struct.SingleTypeSchema {
  collectionName: "tuyen_dungs";
  info: {
    description: "N\u1ED9i dung trang Tuy\u1EC3n D\u1EE5ng";
    displayName: "Tuy\u1EC3n D\u1EE5ng";
    pluralName: "tuyen-dungs";
    singularName: "tuyen-dung";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    cta: Schema.Attribute.Component<"sections.cta-section", false>;
    da_linh_vuc: Schema.Attribute.Component<"sections.da-linh-vuc", false>;
    dich_vu: Schema.Attribute.Component<"sections.services-grid", false>;
    giai_phap: Schema.Attribute.Component<"sections.solutions-grid", false>;
    hero: Schema.Attribute.Component<"sections.hero-section", false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "api::tuyen-dung.tuyen-dung"> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<"shared.seo-meta", false>;
    thach_thuc: Schema.Attribute.Component<"sections.challenges-grid", false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    why_choose: Schema.Attribute.Component<"sections.why-choose", false>;
  };
}

export interface ApiVeChungToiVeChungToi extends Struct.SingleTypeSchema {
  collectionName: "ve_chung_tois";
  info: {
    description: "N\u1ED9i dung trang V\u1EC1 Ch\u00FAng T\u00F4i";
    displayName: "V\u1EC1 Ch\u00FAng T\u00F4i";
    pluralName: "ve-chung-tois";
    singularName: "ve-chung-toi";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    cau_chuyen: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    cta: Schema.Attribute.Component<"sections.cta-section", false>;
    doi_ngu: Schema.Attribute.Relation<"oneToMany", "api::thanh-vien.thanh-vien">;
    gia_tri_cot_loi: Schema.Attribute.Component<"blocks.feature-item", true>;
    hero: Schema.Attribute.Component<"sections.hero-section", false>;
    hinh_cau_chuyen: Schema.Attribute.Media<"images">;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "api::ve-chung-toi.ve-chung-toi"> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<"shared.seo-meta", false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Struct.CollectionTypeSchema {
  collectionName: "strapi_releases";
  info: {
    displayName: "Release";
    pluralName: "releases";
    singularName: "release";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<"oneToMany", "plugin::content-releases.release-action">;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "plugin::content-releases.release"> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<["ready", "blocked", "failed", "done", "empty"]> &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction extends Struct.CollectionTypeSchema {
  collectionName: "strapi_release_actions";
  info: {
    displayName: "Release Action";
    pluralName: "release-actions";
    singularName: "release-action";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      "oneToMany",
      "plugin::content-releases.release-action"
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<"manyToOne", "plugin::content-releases.release">;
    type: Schema.Attribute.Enumeration<["publish", "unpublish"]> & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: "i18n_locale";
  info: {
    collectionName: "locales";
    description: "";
    displayName: "Locale";
    pluralName: "locales";
    singularName: "locale";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "plugin::i18n.locale"> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow extends Struct.CollectionTypeSchema {
  collectionName: "strapi_workflows";
  info: {
    description: "";
    displayName: "Workflow";
    name: "Workflow";
    pluralName: "workflows";
    singularName: "workflow";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"[]">;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "plugin::review-workflows.workflow"> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required & Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      "oneToOne",
      "plugin::review-workflows.workflow-stage"
    >;
    stages: Schema.Attribute.Relation<"oneToMany", "plugin::review-workflows.workflow-stage">;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage extends Struct.CollectionTypeSchema {
  collectionName: "strapi_workflows_stages";
  info: {
    description: "";
    displayName: "Stages";
    name: "Workflow Stage";
    pluralName: "workflow-stages";
    singularName: "workflow-stage";
  };
  options: {
    draftAndPublish: false;
    version: "1.1.0";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<"#4945FF">;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      "oneToMany",
      "plugin::review-workflows.workflow-stage"
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<"manyToMany", "admin::permission">;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<"manyToOne", "plugin::review-workflows.workflow">;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: "files";
  info: {
    description: "";
    displayName: "File";
    pluralName: "files";
    singularName: "file";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.Text;
    caption: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<"manyToOne", "plugin::upload.folder"> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "plugin::upload.file"> &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.Text;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<"morphToMany">;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: "upload_folders";
  info: {
    displayName: "Folder";
    pluralName: "folders";
    singularName: "folder";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<"oneToMany", "plugin::upload.folder">;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    files: Schema.Attribute.Relation<"oneToMany", "plugin::upload.file">;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "plugin::upload.folder"> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<"manyToOne", "plugin::upload.folder">;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer & Schema.Attribute.Required & Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission extends Struct.CollectionTypeSchema {
  collectionName: "up_permissions";
  info: {
    description: "";
    displayName: "Permission";
    name: "permission";
    pluralName: "permissions";
    singularName: "permission";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "plugin::users-permissions.permission"> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<"manyToOne", "plugin::users-permissions.role">;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Struct.CollectionTypeSchema {
  collectionName: "up_roles";
  info: {
    description: "";
    displayName: "Role";
    name: "role";
    pluralName: "roles";
    singularName: "role";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "plugin::users-permissions.role"> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<"oneToMany", "plugin::users-permissions.permission">;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    users: Schema.Attribute.Relation<"oneToMany", "plugin::users-permissions.user">;
  };
}

export interface PluginUsersPermissionsUser extends Struct.CollectionTypeSchema {
  collectionName: "up_users";
  info: {
    description: "";
    displayName: "User";
    name: "user";
    pluralName: "users";
    singularName: "user";
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<"oneToMany", "plugin::users-permissions.user"> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<"manyToOne", "plugin::users-permissions.role">;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<"oneToOne", "admin::user"> & Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ContentTypeSchemas {
      "admin::api-token": AdminApiToken;
      "admin::api-token-permission": AdminApiTokenPermission;
      "admin::permission": AdminPermission;
      "admin::role": AdminRole;
      "admin::session": AdminSession;
      "admin::transfer-token": AdminTransferToken;
      "admin::transfer-token-permission": AdminTransferTokenPermission;
      "admin::user": AdminUser;
      "api::bai-viet.bai-viet": ApiBaiVietBaiViet;
      "api::case-study.case-study": ApiCaseStudyCaseStudy;
      "api::cham-cong.cham-cong": ApiChamCongChamCong;
      "api::doi-tac.doi-tac": ApiDoiTacDoiTac;
      "api::khach-hang.khach-hang": ApiKhachHangKhachHang;
      "api::lien-he.lien-he": ApiLienHeLienHe;
      "api::quan-ly-don-hang.quan-ly-don-hang": ApiQuanLyDonHangQuanLyDonHang;
      "api::quan-ly-nhan-su.quan-ly-nhan-su": ApiQuanLyNhanSuQuanLyNhanSu;
      "api::quan-ly-tai-san.quan-ly-tai-san": ApiQuanLyTaiSanQuanLyTaiSan;
      "api::sap-ca-thong-minh.sap-ca-thong-minh": ApiSapCaThongMinhSapCaThongMinh;
      "api::thanh-vien.thanh-vien": ApiThanhVienThanhVien;
      "api::trang-blog.trang-blog": ApiTrangBlogTrangBlog;
      "api::trang-case-study.trang-case-study": ApiTrangCaseStudyTrangCaseStudy;
      "api::trang-chu.trang-chu": ApiTrangChuTrangChu;
      "api::tuyen-dung.tuyen-dung": ApiTuyenDungTuyenDung;
      "api::ve-chung-toi.ve-chung-toi": ApiVeChungToiVeChungToi;
      "plugin::content-releases.release": PluginContentReleasesRelease;
      "plugin::content-releases.release-action": PluginContentReleasesReleaseAction;
      "plugin::i18n.locale": PluginI18NLocale;
      "plugin::review-workflows.workflow": PluginReviewWorkflowsWorkflow;
      "plugin::review-workflows.workflow-stage": PluginReviewWorkflowsWorkflowStage;
      "plugin::upload.file": PluginUploadFile;
      "plugin::upload.folder": PluginUploadFolder;
      "plugin::users-permissions.permission": PluginUsersPermissionsPermission;
      "plugin::users-permissions.role": PluginUsersPermissionsRole;
      "plugin::users-permissions.user": PluginUsersPermissionsUser;
    }
  }
}
