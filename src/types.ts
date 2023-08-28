type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Result<T> =
  | {
      data: T;
      hasErrors?: never;
      method: Method;
      message?: never;
    }
  | {
      data?: never;
      hasErrors: true;
      message: string;
      method: Method;
    };

export type Adjustment = 1 | -1;

export interface RequestOptions {
  slug: string;
  data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  contentType?: string;
  method: Method;
}

export interface EntitySuccessResponse {
  message: "SUCCESS";
  id: string;
}

export interface EntityDeletionResponse {
  message: "SUCCESS";
  id: undefined;
}

export interface UploadResponse {
  approved: number;
  height: number;
  id: string;
  original_filename: string;
  pending: number;
  url: string;
  width: number;
}

export interface GetImagesParams {
  breed_ids?: number[];
  category_ids?: number;
  format?: "json" | "src";
  limit?: number;
  order?: "ASC" | "DESC";
  original_filename?: string;
  page?: number;
  sub_id?: string;
}

export interface GetImagesResponseItem {
  breeds: [];
  id: string;
  url: string;
  width: number;
  height: number;
  sub_id: string;
  created_at: string;
  original_filename: string;
  breed_ids: string[];
}

export type FavouriteRequest =
  | {
      imageId: string;
      favouriteId?: never;
    }
  | {
      imageId?: never;
      favouriteId: number;
    };

interface ImageMinimal {
  id: string;
  url: string;
}

export interface GetFavouritesResponseItem {
  created_at: string;
  id: number;
  image: ImageMinimal;
  image_id: string;
  sub_id: string;
  user_id: string;
}

export interface GetVotesResponseItem {
  id: number;
  image_id: string;
  sub_id: string;
  created_at: string;
  value: Adjustment;
  country_code: string;
  image: ImageMinimal;
}

export interface ImagesWithMetadata extends GetImagesResponseItem {
  favouriteId?: number;
  isFavourite: boolean;
  score: number;
  votes: number;
}
