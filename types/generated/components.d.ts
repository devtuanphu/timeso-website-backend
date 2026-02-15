import type { Schema, Struct } from "@strapi/strapi";

export interface BlocksAllInOneModule extends Struct.ComponentSchema {
  collectionName: "components_blocks_all_in_one_module";
  info: {
    description: "Module trong section All-in-One";
    displayName: "Module T\u00EDnh N\u0103ng";
  };
  attributes: {
    hinh_anh: Schema.Attribute.Media<"images">;
    link: Schema.Attribute.String;
    mo_ta: Schema.Attribute.Text;
    tieu_de: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksFeatureItem extends Struct.ComponentSchema {
  collectionName: "components_blocks_feature_item";
  info: {
    description: "Item t\u00EDnh n\u0103ng v\u1EDBi icon, ti\u00EAu \u0111\u1EC1 v\u00E0 m\u00F4 t\u1EA3";
    displayName: "T\u00EDnh N\u0103ng";
  };
  attributes: {
    icon: Schema.Attribute.Media<"images">;
    mo_ta: Schema.Attribute.Text;
    tieu_de: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksLienKet extends Struct.ComponentSchema {
  collectionName: "components_blocks_lien_ket";
  info: {
    description: "Link v\u1EDBi label, URL v\u00E0 icon t\u00F9y ch\u1ECDn";
    displayName: "Li\u00EAn K\u1EBFt";
  };
  attributes: {
    duong_dan: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<"images">;
    nhan: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksPricingPlan extends Struct.ComponentSchema {
  collectionName: "components_blocks_pricing_plan";
  info: {
    description: "Pricing plan v\u1EDBi t\u00EAn, gi\u00E1 v\u00E0 t\u00EDnh n\u0103ng";
    displayName: "G\u00F3i Gi\u00E1";
  };
  attributes: {
    don_vi: Schema.Attribute.String & Schema.Attribute.DefaultTo<"/th\u00E1ng">;
    gia: Schema.Attribute.String & Schema.Attribute.Required;
    mo_ta: Schema.Attribute.Text;
    noi_bat: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    nut_text: Schema.Attribute.String & Schema.Attribute.DefaultTo<"B\u1EAFt \u0111\u1EA7u">;
    ten_goi: Schema.Attribute.String & Schema.Attribute.Required;
    tinh_nang: Schema.Attribute.JSON;
  };
}

export interface BlocksStatItem extends Struct.ComponentSchema {
  collectionName: "components_blocks_stat_item";
  info: {
    description: "Item th\u1ED1ng k\u00EA v\u1EDBi s\u1ED1 v\u00E0 label";
    displayName: "Th\u1ED1ng K\u00EA";
  };
  attributes: {
    gia_tri: Schema.Attribute.String & Schema.Attribute.Required;
    hau_to: Schema.Attribute.String;
    mo_ta: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksTargetAudienceItem extends Struct.ComponentSchema {
  collectionName: "components_blocks_target_audience_item";
  info: {
    description: "Item trong section \u0111\u1ED1i t\u01B0\u1EE3ng kh\u00E1ch h\u00E0ng";
    displayName: "\u0110\u1ED1i T\u01B0\u1EE3ng";
  };
  attributes: {
    icon: Schema.Attribute.Media<"images">;
    mo_ta: Schema.Attribute.Text;
    tieu_de: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksTestimonialItem extends Struct.ComponentSchema {
  collectionName: "components_blocks_testimonial_item";
  info: {
    description: "Testimonial t\u1EEB kh\u00E1ch h\u00E0ng";
    displayName: "\u0110\u00E1nh Gi\u00E1";
  };
  attributes: {
    avatar: Schema.Attribute.Media<"images">;
    chuc_vu: Schema.Attribute.String;
    logo_cong_ty: Schema.Attribute.Media<"images">;
    noi_dung: Schema.Attribute.Text & Schema.Attribute.Required;
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
  };
}

export interface BlocksThongTinLienLac extends Struct.ComponentSchema {
  collectionName: "components_blocks_thong_tin_lien_lac";
  info: {
    description: "M\u1EE5c li\u00EAn h\u1EC7 (Phone, Email, Zalo)";
    displayName: "Th\u00F4ng Tin Li\u00EAn L\u1EA1c";
  };
  attributes: {
    gia_tri: Schema.Attribute.String & Schema.Attribute.Required;
    loai: Schema.Attribute.Enumeration<["phone", "email", "zalo"]> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"phone">;
    nhan: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksUserStory extends Struct.ComponentSchema {
  collectionName: "components_blocks_user_story";
  info: {
    description: "User story item";
    displayName: "C\u00E2u Chuy\u1EC7n";
  };
  attributes: {
    hinh_anh: Schema.Attribute.Media<"images">;
    link: Schema.Attribute.String;
    mau_nen: Schema.Attribute.String;
    mo_ta: Schema.Attribute.Text;
    tieu_de: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsAiSection extends Struct.ComponentSchema {
  collectionName: "components_sections_ai_section";
  info: {
    description: "Section gi\u1EDBi thi\u1EC7u t\u00EDnh n\u0103ng AI";
    displayName: "AI Section";
  };
  attributes: {
    hinh_anh: Schema.Attribute.Media<"images">;
    mo_ta: Schema.Attribute.Text;
    tieu_de: Schema.Attribute.String & Schema.Attribute.Required;
    tieu_de_noi_bat: Schema.Attribute.String;
    tinh_nang: Schema.Attribute.Component<"blocks.feature-item", true>;
  };
}

export interface SectionsAllInOne extends Struct.ComponentSchema {
  collectionName: "components_sections_all_in_one";
  info: {
    description: "Section hi\u1EC3n th\u1ECB c\u00E1c modules/t\u00EDnh n\u0103ng v\u1EDBi tabs";
    displayName: "T\u1EA5t C\u1EA3 Trong M\u1ED9t";
  };
  attributes: {
    mo_ta: Schema.Attribute.Text;
    modules: Schema.Attribute.Component<"blocks.all-in-one-module", true>;
    tieu_de: Schema.Attribute.String & Schema.Attribute.Required;
    tieu_de_phu: Schema.Attribute.String;
  };
}

export interface SectionsChallengesGrid extends Struct.ComponentSchema {
  collectionName: "components_sections_challenges_grid";
  info: {
    description: "Grid hi\u1EC3n th\u1ECB c\u00E1c th\u00E1ch th\u1EE9c";
    displayName: "Th\u00E1ch Th\u1EE9c Grid";
  };
  attributes: {
    hinh_anh: Schema.Attribute.Media<"images">;
    thach_thuc: Schema.Attribute.Component<"blocks.feature-item", true>;
    tieu_de: Schema.Attribute.String;
  };
}

export interface SectionsComparison extends Struct.ComponentSchema {
  collectionName: "components_sections_comparison";
  info: {
    description: "Section so s\u00E1nh t\u00EDnh n\u0103ng";
    displayName: "So S\u00E1nh";
  };
  attributes: {
    du_lieu: Schema.Attribute.JSON;
    mo_ta: Schema.Attribute.Text;
    tieu_de: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsCtaSection extends Struct.ComponentSchema {
  collectionName: "components_sections_cta_section";
  info: {
    description: "Call to action section v\u1EDBi ti\u00EAu \u0111\u1EC1, m\u00F4 t\u1EA3 v\u00E0 badges";
    displayName: "CTA Section";
  };
  attributes: {
    app_store_url: Schema.Attribute.String;
    google_play_url: Schema.Attribute.String;
    hinh_anh: Schema.Attribute.Media<"images">;
    mau_nen: Schema.Attribute.String & Schema.Attribute.DefaultTo<"#E6FEFF">;
    mo_ta: Schema.Attribute.Text;
    tieu_de: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsCyanBanner extends Struct.ComponentSchema {
  collectionName: "components_sections_cyan_banner";
  info: {
    description: "Banner n\u1ED5i b\u1EADt v\u1EDBi th\u1ED1ng k\u00EA";
    displayName: "Banner M\u00E0u";
  };
  attributes: {
    thong_ke: Schema.Attribute.Component<"blocks.stat-item", true>;
    tieu_de: Schema.Attribute.String & Schema.Attribute.Required;
    tieu_de_phu: Schema.Attribute.String;
  };
}

export interface SectionsDaLinhVuc extends Struct.ComponentSchema {
  collectionName: "components_sections_da_linh_vuc";
  info: {
    description: "Section th\u1ED1ng k\u00EA \u0111a l\u0129nh v\u1EF1c v\u1EDBi s\u1ED1 li\u1EC7u v\u00E0 h\u00ECnh \u1EA3nh";
    displayName: "\u0110a L\u0129nh V\u1EF1c";
  };
  attributes: {
    hinh_anh: Schema.Attribute.Media<"images", true>;
    thong_ke: Schema.Attribute.Component<"blocks.stat-item", true>;
    tieu_de: Schema.Attribute.String & Schema.Attribute.DefaultTo<"\u0110A L\u0128NH V\u1EF0C">;
    tieu_de_phu: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"Ph\u00E1t tri\u1EC3n \u1EE9ng d\u1EE5ng">;
  };
}

export interface SectionsFeatureCard extends Struct.ComponentSchema {
  collectionName: "components_sections_feature_card";
  info: {
    description: "Card t\u00EDnh n\u0103ng v\u1EDBi ti\u00EAu \u0111\u1EC1, danh s\u00E1ch v\u00E0 h\u00ECnh \u1EA3nh";
    displayName: "Feature Card";
  };
  attributes: {
    danh_sach: Schema.Attribute.JSON;
    hinh_anh: Schema.Attribute.Media<"images">;
    mau_nen: Schema.Attribute.String & Schema.Attribute.DefaultTo<"#f5f5f5">;
    tieu_de: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHeroSection extends Struct.ComponentSchema {
  collectionName: "components_sections_hero_section";
  info: {
    description: "Section hero v\u1EDBi ti\u00EAu \u0111\u1EC1, m\u00F4 t\u1EA3 v\u00E0 video";
    displayName: "Hero Section";
  };
  attributes: {
    app_store_url: Schema.Attribute.String;
    google_play_url: Schema.Attribute.String;
    hien_thi_badges: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    mo_ta: Schema.Attribute.Text;
    tieu_de: Schema.Attribute.String & Schema.Attribute.Required;
    video: Schema.Attribute.Media<"videos">;
  };
}

export interface SectionsPricingSection extends Struct.ComponentSchema {
  collectionName: "components_sections_pricing_section";
  info: {
    description: "Section hi\u1EC3n th\u1ECB c\u00E1c g\u00F3i gi\u00E1";
    displayName: "B\u1EA3ng Gi\u00E1 Section";
  };
  attributes: {
    goi_gia: Schema.Attribute.Component<"blocks.pricing-plan", true>;
    mo_ta: Schema.Attribute.Text;
    tieu_de: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"Ch\u1ECDn g\u00F3i ph\u00F9 h\u1EE3p!">;
  };
}

export interface SectionsServicesGrid extends Struct.ComponentSchema {
  collectionName: "components_sections_services_grid";
  info: {
    description: "Grid hi\u1EC3n th\u1ECB c\u00E1c d\u1ECBch v\u1EE5";
    displayName: "D\u1ECBch V\u1EE5 Grid";
  };
  attributes: {
    dich_vu: Schema.Attribute.Component<"blocks.feature-item", true>;
    hinh_anh: Schema.Attribute.Media<"images">;
    mo_ta: Schema.Attribute.Text;
    tieu_de: Schema.Attribute.String;
    tieu_de_phu: Schema.Attribute.String;
  };
}

export interface SectionsSolutionsGrid extends Struct.ComponentSchema {
  collectionName: "components_sections_solutions_grid";
  info: {
    description: "Grid hi\u1EC3n th\u1ECB c\u00E1c gi\u1EA3i ph\u00E1p";
    displayName: "Gi\u1EA3i Ph\u00E1p Grid";
  };
  attributes: {
    giai_phap: Schema.Attribute.Component<"blocks.feature-item", true>;
    mo_ta: Schema.Attribute.Text;
    tieu_de: Schema.Attribute.String;
    tieu_de_phu: Schema.Attribute.String;
  };
}

export interface SectionsTargetAudience extends Struct.ComponentSchema {
  collectionName: "components_sections_target_audience";
  info: {
    description: "Section hi\u1EC3n th\u1ECB c\u00E1c \u0111\u1ED1i t\u01B0\u1EE3ng kh\u00E1ch h\u00E0ng m\u1EE5c ti\u00EAu";
    displayName: "\u0110\u1ED1i T\u01B0\u1EE3ng Kh\u00E1ch H\u00E0ng";
  };
  attributes: {
    doi_tuong: Schema.Attribute.Component<"blocks.target-audience-item", true>;
    mo_ta: Schema.Attribute.Text;
    tieu_de: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTestimonials extends Struct.ComponentSchema {
  collectionName: "components_sections_testimonials";
  info: {
    description: "Section hi\u1EC3n th\u1ECB c\u00E1c \u0111\u00E1nh gi\u00E1 t\u1EEB kh\u00E1ch h\u00E0ng";
    displayName: "\u0110\u00E1nh Gi\u00E1 Section";
  };
  attributes: {
    danh_gia: Schema.Attribute.Component<"blocks.testimonial-item", true>;
    tieu_de: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"Kh\u00E1ch h\u00E0ng n\u00F3i g\u00EC v\u1EC1 ch\u00FAng t\u00F4i?">;
  };
}

export interface SectionsTrustedBy extends Struct.ComponentSchema {
  collectionName: "components_sections_trusted_by";
  info: {
    description: "Section hi\u1EC3n th\u1ECB logo c\u00E1c \u0111\u1ED1i t\u00E1c";
    displayName: "\u0110\u1ED1i T\u00E1c Tin T\u01B0\u1EDFng";
  };
  attributes: {
    logos: Schema.Attribute.Media<"images", true>;
    tieu_de: Schema.Attribute.String;
  };
}

export interface SectionsUserStories extends Struct.ComponentSchema {
  collectionName: "components_sections_user_stories";
  info: {
    description: "Section hi\u1EC3n th\u1ECB c\u00E1c user stories";
    displayName: "C\u00E2u Chuy\u1EC7n Ng\u01B0\u1EDDi D\u00F9ng";
  };
  attributes: {
    mo_ta: Schema.Attribute.Text;
    stories: Schema.Attribute.Component<"blocks.user-story", true>;
    tieu_de: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsWhyChoose extends Struct.ComponentSchema {
  collectionName: "components_sections_why_choose";
  info: {
    description: "Section l\u00FD do n\u00EAn ch\u1ECDn v\u1EDBi c\u00E1c card";
    displayName: "L\u00FD Do Ch\u1ECDn";
  };
  attributes: {
    cac_ly_do: Schema.Attribute.Component<"blocks.feature-item", true>;
    hinh_nen: Schema.Attribute.Media<"images">;
    tieu_de: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"L\u00FD do n\u00EAn ch\u1ECDn Timeso?">;
  };
}

export interface SharedBadgesApp extends Struct.ComponentSchema {
  collectionName: "components_shared_badges_app";
  info: {
    description: "App Store v\u00E0 Google Play badges";
    displayName: "Badges App";
  };
  attributes: {
    app_store_url: Schema.Attribute.String;
    google_play_url: Schema.Attribute.String;
    hien_thi: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface SharedHinhAnh extends Struct.ComponentSchema {
  collectionName: "components_shared_hinh_anh";
  info: {
    description: "Component h\u00ECnh \u1EA3nh v\u1EDBi alt text";
    displayName: "H\u00ECnh \u1EA2nh";
  };
  attributes: {
    alt_text: Schema.Attribute.String;
    hinh: Schema.Attribute.Media<"images"> & Schema.Attribute.Required;
  };
}

export interface SharedNutBam extends Struct.ComponentSchema {
  collectionName: "components_shared_nut_bam";
  info: {
    description: "CTA button v\u1EDBi text v\u00E0 link";
    displayName: "N\u00FAt B\u1EA5m";
  };
  attributes: {
    duong_dan: Schema.Attribute.String & Schema.Attribute.Required;
    loai: Schema.Attribute.Enumeration<["primary", "secondary", "outline"]> &
      Schema.Attribute.DefaultTo<"primary">;
    noi_dung: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeoMeta extends Struct.ComponentSchema {
  collectionName: "components_shared_seo_meta";
  info: {
    description: "SEO metadata cho t\u1EA5t c\u1EA3 c\u00E1c trang";
    displayName: "SEO Meta";
  };
  attributes: {
    canonical_url: Schema.Attribute.String;
    hinh_og: Schema.Attribute.Media<"images">;
    mo_ta: Schema.Attribute.Text;
    tieu_de: Schema.Attribute.String & Schema.Attribute.Required;
    tu_khoa: Schema.Attribute.String;
  };
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "blocks.all-in-one-module": BlocksAllInOneModule;
      "blocks.feature-item": BlocksFeatureItem;
      "blocks.lien-ket": BlocksLienKet;
      "blocks.pricing-plan": BlocksPricingPlan;
      "blocks.stat-item": BlocksStatItem;
      "blocks.target-audience-item": BlocksTargetAudienceItem;
      "blocks.testimonial-item": BlocksTestimonialItem;
      "blocks.thong-tin-lien-lac": BlocksThongTinLienLac;
      "blocks.user-story": BlocksUserStory;
      "sections.ai-section": SectionsAiSection;
      "sections.all-in-one": SectionsAllInOne;
      "sections.challenges-grid": SectionsChallengesGrid;
      "sections.comparison": SectionsComparison;
      "sections.cta-section": SectionsCtaSection;
      "sections.cyan-banner": SectionsCyanBanner;
      "sections.da-linh-vuc": SectionsDaLinhVuc;
      "sections.feature-card": SectionsFeatureCard;
      "sections.hero-section": SectionsHeroSection;
      "sections.pricing-section": SectionsPricingSection;
      "sections.services-grid": SectionsServicesGrid;
      "sections.solutions-grid": SectionsSolutionsGrid;
      "sections.target-audience": SectionsTargetAudience;
      "sections.testimonials": SectionsTestimonials;
      "sections.trusted-by": SectionsTrustedBy;
      "sections.user-stories": SectionsUserStories;
      "sections.why-choose": SectionsWhyChoose;
      "shared.badges-app": SharedBadgesApp;
      "shared.hinh-anh": SharedHinhAnh;
      "shared.nut-bam": SharedNutBam;
      "shared.seo-meta": SharedSeoMeta;
    }
  }
}
