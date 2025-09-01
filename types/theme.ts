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
  label: string;
  url: string;
  icon?: string;
};

export type Section =
  | {
      type: "links";
      title?: string;
      links: LinkItem[];
    }
  | {
      type: "spotify";
      title?: string;
      displayMode: "embed" | "list";
      playlistId?: string;
      showFollowButton?: boolean;
    }
  | {
      type: "youtube";
      title?: string;
      channelId: string;
      displayMode: "grid" | "list";
      limit?: number;
      showSubscribeButton?: boolean;
    }
  | {
      type: "instagram";
      title?: string;
      username: string;
      displayMode: "grid" | "carousel";
      limit?: number;
      showFollowButton?: boolean;
    }
  | {
      type: "products";
      title?: string;
      provider: "gumroad" | "wix";
      storeId: string;
      displayMode: "cards" | "list";
      limit?: number;
    }
  | {
      type: "customHtml";
      title?: string;
      html: string;
    };

export type BioPage = {
  profile: Profile;
  theme: Theme;
  sections: Section[];
};
