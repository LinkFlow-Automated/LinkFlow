export type BaseCardProps = {
  title?: string; // optional section title
  layout?: "compact" | "expanded" | "minimal";
  themeOverrides?: CardTheme; // local style overrides
};

// Background options
export type Background =
  | { type: "solid"; color: string }
  | { type: "gradient"; colors: string[]; angle?: number }
  | {
      type: "image";
      url: string;
      overlayColor?: string;
      blur?: boolean;
      opacity?: number;
    }
  | {
      type: "video";
      url: string;
      autoplay?: boolean;
      loop?: boolean;
      muted?: boolean;
    }
  | { type: "gif"; url: string }
  | { type: "dynamic-photo"; source: "cover" | "avatar"; fallback?: string };

// Global theme for a page
export type Theme = {
  font: string;
  primaryColor: string;
  background: Background;
  cardStyle: "flat" | "neumorphism" | "glassmorphism";
  buttonStyle: "rounded" | "pill" | "square";
  showFooter: boolean;
  cardTheme: CardTheme;
};

// Per-card theme overrides
export type CardTheme = {
  background?: Background;
  textColor?: string;
  borderStyle?: "none" | "solid" | "dashed" | "glow";
  borderColor?: string;
  borderRadius?: "none" | "sm" | "md" | "lg" | "xl" | "full" | "2xl";
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "glow";
  animation?: "none" | "hover-rise" | "pulse" | "fade-in" | "slide-in";
  layout?: "compact" | "expanded" | "minimal";
};

// Profile info
export type Profile = {
  name: string;
  username: string;
  bio?: string;
  avatar?: string;
  verified?: boolean;
};

// Link items
export type LinkItem = {
  id: string;
  label: string;
  url: string;
  icon?: string;
  iconType?: "emoji" | "image" | "icon-font";
  backgroundColor?: string;
  textColor?: string;
  layout?: "default" | "minimal" | "highlighted";
  behavior: "new-tab" | "same-tab" | "modal";
  tracking?: {
    enabled: boolean;
    id?: string;
  };
};

// Sections (each one extends BaseCardProps)
export type Section =
  | (BaseCardProps & {
      type: "links";
      links: LinkItem[];
    })
  | (BaseCardProps & {
      type: "spotify";
      displayMode: "embed" | "list" | "card";
      playlistId?: string;
      artistId?: string;
      showFollowButton?: boolean;
      showNowPlaying?: boolean;
    })
  | (BaseCardProps & {
      type: "youtube";
      channelId: string;
      displayMode: "grid" | "list" | "carousel";
      limit?: number;
      showSubscribeButton?: boolean;
      showViewCount?: boolean;
    })
  | (BaseCardProps & {
      type: "instagram";
      username: string;
      displayMode: "grid" | "carousel";
      limit?: number;
      showFollowButton?: boolean;
      showLikes?: boolean;
      showCaptions?: boolean;
    })
  | (BaseCardProps & {
      type: "products";
      provider: "gumroad" | "wix";
      storeId: string;
      displayMode: "cards" | "list";
      limit?: number;
      showPrice?: boolean;
      showBuyButton?: boolean;
      buttonStyle?: "primary" | "outline" | "ghost";
    })
  | (BaseCardProps & {
      type: "newsletter";
      provider: "mailchimp" | "convertkit" | "beehiiv";
      formAction: string;
      placeholder?: string;
      ctaLabel?: string;
      successMessage?: string;
    })
  | (BaseCardProps & {
      type: "customHtml";
      html: string;
      responsive?: boolean;
    });

// Full BioPage schema
export type BioPage = {
  profile: Profile;
  theme: Theme;
  sections: Section[];
};
