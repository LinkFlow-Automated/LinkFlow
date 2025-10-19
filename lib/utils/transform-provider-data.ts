import { Link } from "../generated/prisma";
import { GumroadProduct } from "../../types/gumroad";
import { SpotifyAlbum, SpotifyTrack } from "@/types/spotify";
import {
  YouTubeChannel,
  YouTubePlaylistItem,
  YouTubeVideo,
} from "@/types/youtube";

type ProviderData =
  | { provider: "gumroad"; type: "product"; data: GumroadProduct }
  | {
      provider: "instagram";
      type: "feed";
      data: { name: string; description: string; id: string };
    }
  | { provider: "spotify"; type: "album"; data: SpotifyAlbum }
  | { provider: "spotify"; type: "track"; data: SpotifyTrack }
  | {
      provider: "youtube";
      type: "video";
      data: YouTubeVideo;
    }
  | {
      provider: "youtube";
      type: "playlist";
      data: YouTubePlaylistItem;
    }
  | {
      provider: "youtube";
      type: "channel";
      data: YouTubeChannel;
    };

export const transformProviderData = ({
  provider,
  data,
  type,
  userId,
}: ProviderData & { userId: string }): Omit<
  Link,
  "id" | "createdAt" | "updatedAt"
> => {
  switch (provider) {
    case "gumroad":
      return {
        userId,
        title: data.name,
        description: data.description,
        url: data.short_url,
        thumbnail: data.preview_url,
        isHadRedirectLink: false,
        order: 0,
        category: "",
        redirectTo: "",
        isArchived: false,
        visibility: "PRIVATE",
        type: "image",
        platform: "gumroad",
        clicks: 0,
        autoSyncId: data.id,
        featured: false,
        rules: null,
        layout: null,
        animation: null,
        themeOverrides: {},
        scheduledAt: null,
        expiresAt: null,
        metadata: {
          provider: "gumroad",
          subType: "product",
          data: {
            id: data.id,
            name: data.name,
            description: data.description,
            preview_url: data.preview_url,
            short_url: data.short_url,
            price: data.price,
            currency: data.currency,
          },
        },
      };
    case "instagram":
      return {
        userId,
        title: data.name,
        description: data.description,
        url: "",
        thumbnail: "",
        type: "image",
        platform: "instagram",
        clicks: 0,
        order: 0,
        category: "",
        redirectTo: "",
        isHadRedirectLink: false,
        visibility: "PUBLIC",
        isArchived: false,
        autoSyncId: data.id,
        featured: false,
        rules: null,
        layout: null,
        animation: null,
        themeOverrides: {},
        scheduledAt: null,
        expiresAt: null,
        metadata: {
          provider: "instagram",
          subType: type,
          data: data,
        },
      };
    case "spotify":
      switch (type) {
        case "track":
          return {
            userId,
            title: data.name,
            description: null,
            category: null,
            order: 0,
            isArchived: false,
            visibility: "PUBLIC",
            url: data.uri,
            thumbnail: data.preview_url,
            type: "image",
            platform: "spotify",
            clicks: 0,
            isHadRedirectLink: false,
            redirectTo: null,
            autoSyncId: data.id,
            scheduledAt: null,
            expiresAt: null,
            featured: false,
            rules: null,
            layout: null,
            animation: null,
            themeOverrides: null,
            metadata: {
              id: data.id,
              subtype: "track",
              name: data.name,
              duration: data.duration_ms,
              type: data.type,
              artists: data.artists.map((artist) => ({
                id: artist.id,
                name: artist.name,
                type: artist.type,
                url: artist.uri,
              })),
            },
          };
        case "album":
          return {
            userId,
            title: data.name,
            url: data.uri,
            thumbnail: data.images[0].url,
            type: "image",
            description: null,
            category: null,
            order: 0,
            isHadRedirectLink: false,
            redirectTo: null,
            isArchived: false,
            visibility: "PUBLIC",
            platform: "spotify",
            clicks: 0,
            autoSyncId: data.id,
            scheduledAt: null,
            expiresAt: null,
            featured: false,
            rules: null,
            layout: null,
            animation: null,
            themeOverrides: null,
            metadata: {
              id: data.id,
              type: data.album_type,
              subtype: "album",
              tracks: data.tracks.items.map((track) => ({
                id: track.id,
                name: track.name,
                url: track.uri,
                image: track.preview_url,
              })),
            },
          };
        default:
          throw new Error(`Unsupported Spotify type: ${type}`);
      }
    case "youtube":
      switch (type) {
        case "video":
          return {
            userId,
            title: data.localizations?.[0]?.title ?? "",
            description: data.localizations?.[0]?.description ?? "",
            url: data.id,
            thumbnail: data.snippet.thumbnails.default.url,
            type: "image",
            platform: "youtube",
            clicks: 0,
            order: 0,
            category: "",
            redirectTo: "",
            isHadRedirectLink: false,
            visibility: "PUBLIC",
            isArchived: false,
            autoSyncId: data.id,
            featured: false,
            rules: null,
            layout: null,
            animation: null,
            themeOverrides: {},
            scheduledAt: null,
            expiresAt: null,
            metadata: {
              id: data.id,
              subType: "video",
              duration: data.fileDetails?.durationMs,
              tag: data.etag,
              statistics: JSON.stringify(data.statistics),
            },
          };
        case "playlist":
          return {
            userId,
            title: data.snippet.channelTitle,
            description: data.snippet.description,
            autoSyncId: data.id,
            url: "",
            thumbnail: data.snippet.thumbnails.default.url,
            type: "image",
            platform: "youtube",
            clicks: 0,
            order: 0,
            category: "",
            redirectTo: "",
            isHadRedirectLink: false,
            visibility: "PUBLIC",
            isArchived: false,
            featured: false,
            rules: null,
            layout: null,
            animation: null,
            themeOverrides: {},
            scheduledAt: null,
            expiresAt: null,
            metadata: {
              id: data.id,
              subType: "playlist",
              tag: data.etag,
            },
          };
        case "channel":
          return {
            userId,
            title: data.snippet.title,
            description: data.snippet.description,
            autoSyncId: data.id,
            url: "",
            thumbnail: data.snippet.thumbnails.default.url,
            type: "image",
            platform: "youtube",
            clicks: 0,
            order: 0,
            category: "",
            redirectTo: "",
            isHadRedirectLink: false,
            visibility: "PUBLIC",
            isArchived: false,
            featured: false,
            rules: null,
            layout: null,
            animation: null,
            themeOverrides: {},
            scheduledAt: null,
            expiresAt: null,
            metadata: {
              subtype: "channel",
              tag: data.etag,
              statistics: data.statistics,
            },
          };
        default:
          throw new Error(`Unsupported Youtube type: ${type}`);
      }
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
};
