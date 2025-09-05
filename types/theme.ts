export type Background =
  | { type: "solid"; color: string }
  | { type: "gradient"; colors: string[] }
  | { type: "image"; url: string };

export type Theme = {
  font: string;
  primaryColor: string;
  background: Background;
  cardStyle: "flat" | "neumorphism" | "glassmorphism";
  buttonStyle: "rounded" | "pill" | "square";
  showFooter: boolean;
};

export type Profile = {
  name: string;
  username: string;
  bio?: string;
  avatar?: string;
  verified?: boolean;
};

export type LinkItem = {
  id: string;
  label: string;
  url: string;
  icon?: string;
  iconType?: "emoji" | "image" | "icon-font"; // Specify icon type
  backgroundColor?: string; // Custom background for specific links
  textColor?: string; // Custom text color for specific links
  layout?: "default" | "minimal" | "highlighted";
  behavior: "new-tab" | "same-tab" | "modal"; // How the link should open
  tracking?: {
    enabled: boolean;
    id?: string; // For analytics tracking
  };
};

export type Section =
  | {
      type: "links";
      title?: string;
      links: LinkItem[];
      layout?: string;
    }
  | {
      type: "spotify";
      title?: string;
      displayMode: "embed" | "list";
      playlistId?: string;
      showFollowButton?: boolean;
      layout?: string;
    }
  | {
      type: "youtube";
      title?: string;
      channelId: string;
      displayMode: "grid" | "list";
      limit?: number;
      showSubscribeButton?: boolean;
      layout?: string;
    }
  | {
      type: "instagram";
      title?: string;
      username: string;
      displayMode: "grid" | "carousel";
      limit?: number;
      showFollowButton?: boolean;
      layout?: string;
    }
  | {
      type: "products";
      title?: string;
      provider: "gumroad" | "wix";
      storeId: string;
      displayMode: "cards" | "list";
      limit?: number;
      layout?: string;
    }
  | {
      type: "customHtml";
      title?: string;
      html: string;
      layout?: string;
    };

export type BioPage = {
  profile: Profile;
  theme: Theme;
  sections: Section[];
};
