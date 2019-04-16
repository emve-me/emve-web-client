/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Search
// ====================================================

export interface Search_YoutubeApi_search_list_items_id {
  __typename: "ResourceId";
  /**
   * The ID that YouTube uses to uniquely identify the referred resource, if that
   * resource is a video. This property is only present if the resourceId.kind
   * value is youtube#video.
   */
  videoId: string | null;
}

export interface Search_YoutubeApi_search_list_items_snippet_thumbnails_high {
  __typename: "Thumbnail";
  /**
   * The thumbnail image's URL.
   */
  url: string | null;
}

export interface Search_YoutubeApi_search_list_items_snippet_thumbnails {
  __typename: "ThumbnailDetails";
  /**
   * The high quality image for this resource.
   */
  high: Search_YoutubeApi_search_list_items_snippet_thumbnails_high | null;
}

export interface Search_YoutubeApi_search_list_items_snippet {
  __typename: "SearchResultSnippet";
  /**
   * The title of the search result.
   */
  title: string | null;
  /**
   * A map of thumbnail images associated with the search result. For each object
   * in the map, the key is the name of the thumbnail image, and the value is an
   * object that contains other information about the thumbnail.
   */
  thumbnails: Search_YoutubeApi_search_list_items_snippet_thumbnails | null;
}

export interface Search_YoutubeApi_search_list_items {
  __typename: "SearchResult";
  /**
   * The id object contains information that can be used to uniquely identify the resource that matches the search request.
   */
  id: Search_YoutubeApi_search_list_items_id | null;
  /**
   * The snippet object contains basic details about a search result, such as its
   * title or description. For example, if the search result is a video, then the
   * title will be the video's title and the description will be the video's description.
   */
  snippet: Search_YoutubeApi_search_list_items_snippet | null;
}

export interface Search_YoutubeApi_search_list {
  __typename: "SearchListResponse";
  /**
   * A list of results that match the search criteria.
   */
  items: (Search_YoutubeApi_search_list_items | null)[] | null;
}

export interface Search_YoutubeApi_search {
  __typename: "Search_";
  /**
   * Returns a collection of search results that match the query parameters
   * specified in the API request. By default, a search result set identifies
   * matching video, channel, and playlist resources, but you can also configure
   * queries to only retrieve a specific type of resource.
   */
  list: Search_YoutubeApi_search_list | null;
}

export interface Search_YoutubeApi {
  __typename: "YoutubeResources";
  search: Search_YoutubeApi_search | null;
}

export interface Search {
  YoutubeApi: Search_YoutubeApi | null;
}

export interface SearchVariables {
  q?: string | null;
}
