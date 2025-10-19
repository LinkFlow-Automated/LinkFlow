export interface YouTubeVideoListResponse {
  kind: "youtube#videoListResponse";
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeVideo[];
}

export interface YouTubeVideo {
  kind: "youtube#video";
  etag: string;
  id: string;
  snippet: YouTubeSnippet;
  contentDetails: YouTubeContentDetails;
  status: YouTubeStatus;
  statistics?: YouTubeStatistics;
  paidProductPlacementDetails?: {
    hasPaidProductPlacement: boolean;
  };
  player?: {
    embedHtml: string;
    embedHeight: number;
    embedWidth: number;
  };
  topicDetails?: {
    topicIds?: string[];
    relevantTopicIds?: string[];
    topicCategories?: string[];
  };
  recordingDetails?: {
    recordingDate: string;
  };
  fileDetails?: YouTubeFileDetails;
  processingDetails?: YouTubeProcessingDetails;
  suggestions?: YouTubeSuggestions;
  liveStreamingDetails?: YouTubeLiveStreamingDetails;
  localizations?: Record<string, YouTubeLocalization>;
}

export interface YouTubeSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Record<string, YouTubeThumbnail>;
  channelTitle: string;
  tags?: string[];
  categoryId: string;
  liveBroadcastContent: string;
  defaultLanguage?: string;
  localized: YouTubeLocalization;
  defaultAudioLanguage?: string;
}

export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeLocalization {
  title: string;
  description: string;
}

export interface YouTubeContentDetails {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  regionRestriction?: {
    allowed?: string[];
    blocked?: string[];
  };
  contentRating?: Record<string, string | string[] | undefined>;
  projection: string;
  hasCustomThumbnail: boolean;
}

export interface YouTubeStatus {
  uploadStatus: string;
  failureReason?: string;
  rejectionReason?: string;
  privacyStatus: string;
  publishAt?: string;
  license: string;
  embeddable: boolean;
  publicStatsViewable: boolean;
  madeForKids: boolean;
  selfDeclaredMadeForKids: boolean;
  containsSyntheticMedia?: boolean;
}

export interface YouTubeStatistics {
  viewCount: string;
  likeCount?: string;
  dislikeCount?: string;
  favoriteCount: string;
  commentCount?: string;
}

export interface YouTubeFileDetails {
  fileName: string;
  fileSize: number;
  fileType: string;
  container: string;
  videoStreams?: YouTubeVideoStream[];
  audioStreams?: YouTubeAudioStream[];
  durationMs: number;
  bitrateBps: number;
  creationTime: string;
}

export interface YouTubeVideoStream {
  widthPixels: number;
  heightPixels: number;
  frameRateFps: number;
  aspectRatio: number;
  codec: string;
  bitrateBps: number;
  rotation: string;
  vendor: string;
}

export interface YouTubeAudioStream {
  channelCount: number;
  codec: string;
  bitrateBps: number;
  vendor: string;
}

export interface YouTubeProcessingDetails {
  processingStatus: string;
  processingProgress?: {
    partsTotal: number;
    partsProcessed: number;
    timeLeftMs: number;
  };
  processingFailureReason?: string;
  fileDetailsAvailability?: string;
  processingIssuesAvailability?: string;
  tagSuggestionsAvailability?: string;
  editorSuggestionsAvailability?: string;
  thumbnailsAvailability?: string;
}

export interface YouTubeSuggestions {
  processingErrors?: string[];
  processingWarnings?: string[];
  processingHints?: string[];
  tagSuggestions?: {
    tag: string;
    categoryRestricts?: string[];
  }[];
  editorSuggestions?: string[];
}

export interface YouTubeLiveStreamingDetails {
  actualStartTime?: string;
  actualEndTime?: string;
  scheduledStartTime?: string;
  scheduledEndTime?: string;
  concurrentViewers?: number;
  activeLiveChatId?: string;
}

export interface YouTubePlaylistItemListResponse {
  kind: "youtube#playlistItemListResponse";
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubePlaylistItem[];
}

export interface YouTubePlaylistItem {
  kind: "youtube#playlistItem";
  etag: string;
  id: string;
  snippet: {
    publishedAt: string; // ISO 8601 datetime
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
  };
  contentDetails: {
    videoId: string;
    startAt?: string;
    endAt?: string;
    note?: string;
    videoPublishedAt: string;
  };
  status: {
    privacyStatus: "public" | "private" | "unlisted";
  };
}

export interface YouTubeChannelListResponse {
  kind: "youtube#channelListResponse";
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeChannel[];
}

export interface YouTubeChannel {
  kind: "youtube#channel";
  etag: string;
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl?: string;
    publishedAt: string; // ISO 8601 datetime
    thumbnails: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      };
    };
    defaultLanguage?: string;
    localized: {
      title: string;
      description: string;
    };
    country?: string;
  };
  contentDetails?: {
    relatedPlaylists: {
      likes?: string;
      favorites?: string;
      uploads?: string;
    };
  };
  statistics?: {
    viewCount: number;
    subscriberCount: number;
    hiddenSubscriberCount: boolean;
    videoCount: number;
  };
  topicDetails?: {
    topicIds?: string[];
    topicCategories?: string[];
  };
  status?: {
    privacyStatus: "public" | "private" | "unlisted";
    isLinked: boolean;
    longUploadsStatus?: string;
    madeForKids: boolean;
    selfDeclaredMadeForKids: boolean;
  };
  brandingSettings?: {
    channel?: {
      title?: string;
      description?: string;
      keywords?: string;
      trackingAnalyticsAccountId?: string;
      unsubscribedTrailer?: string;
      defaultLanguage?: string;
      country?: string;
    };
    watch?: {
      textColor?: string;
      backgroundColor?: string;
      featuredPlaylistId?: string;
    };
  };
  auditDetails?: {
    overallGoodStanding: boolean;
    communityGuidelinesGoodStanding: boolean;
    copyrightStrikesGoodStanding: boolean;
    contentIdClaimsGoodStanding: boolean;
  };
  contentOwnerDetails?: {
    contentOwner?: string;
    timeLinked?: string; // ISO 8601 datetime
  };
  localizations?: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
}
