import { toQueryString } from "@Utils";
import axios from "axios";
import {
  GetImagesParams,
  UploadResponse,
  RequestOptions,
  GetImagesResponseItem,
  GetFavouritesResponseItem,
  Result,
  GetVotesResponseItem,
  Adjustment,
  EntitySuccessResponse,
  EntityDeletionResponse,
} from "@Types";
import { enqueueSnackbar } from "notistack";

const URL_PREFIX = "https://api.thecatapi.com/v1";

function Services() {
  async function addFavourite(imageId: string): Promise<Result<EntitySuccessResponse>> {
    return await requestJson({
      data: { image_id: imageId },
      method: "POST",
      slug: "/favourites",
    });
  }

  async function adjustVotes(imageId: string, adjustment: Adjustment): Promise<Result<EntitySuccessResponse>> {
    return await requestJson({
      data: { image_id: imageId, value: adjustment },
      method: "POST",
      slug: "/votes",
    });
  }

  async function getFavourites(): Promise<Result<GetFavouritesResponseItem[]>> {
    return await requestJson({
      method: "GET",
      slug: "/favourites",
    });
  }

  async function getImages(params: GetImagesParams): Promise<Result<GetImagesResponseItem[]>> {
    return await requestJson({
      method: "GET",
      slug: `/images?${toQueryString({ ...params })}`,
    });
  }

  async function getVotes(): Promise<Result<GetVotesResponseItem[]>> {
    return await requestJson({
      method: "GET",
      slug: "/votes",
    });
  }

  async function removeFavourite(favouriteId: number): Promise<Result<EntityDeletionResponse>> {
    return await requestJson({
      method: "DELETE",
      slug: `/favourites/${favouriteId}`,
    });
  }

  async function uploadImage(file: File): Promise<Result<UploadResponse>> {
    return await requestJson({
      data: { file },
      method: "POST",
      contentType: "multipart/form-data",
      slug: "/images/upload/",
    });
  }

  async function requestJson<T>({
    data,
    contentType = "application/json",
    method,
    slug,
  }: RequestOptions): Promise<Result<T>> {
    const url = `${URL_PREFIX}${slug}`;
    const headers = {
      "Content-Type": contentType,
      "x-api-key": import.meta.env.VITE_CAT_API_KEY,
    };
    return await axios
      .request({ data, headers, method, url })
      .then((response) => ({ data: response.data, method }))
      .catch((error) => {
        // service responded with error
        if (error.response) {
          enqueueSnackbar(error.response.data, {
            variant: "error",
            preventDuplicate: true,
          });
          return { hasErrors: true, message: error.response.data, method };
        }
        // no response received
        if (error.request) return { hasErrors: true, message: "No response received", method };
        // other error
        return { hasErrors: true, message: error.message, method };
      });
  }

  return {
    addFavourite,
    adjustVotes,
    getFavourites,
    getImages,
    getVotes,
    removeFavourite,
    uploadImage,
  };
}
export default Services;
