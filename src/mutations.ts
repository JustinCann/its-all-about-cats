import { useMutation, useQueryClient } from "@tanstack/react-query";
import Services from "@Services";
import { QueryKeys } from "@Constants";
import { RcFile } from "rc-upload/lib/interface";
import { enqueueSnackbar } from "notistack";
import { Adjustment, FavouriteRequest } from "@Types";

export const useAdjustVotes = (imageId: string) => {
  const catService = Services();
  const queryClient = useQueryClient();

  const votingError = () =>
    enqueueSnackbar(`Oops, something went wrong while adjusting the votes.`, {
      variant: "error",
    });

  return useMutation(
    async ({ adjustment }: { adjustment: Adjustment }) => await catService.adjustVotes(imageId, adjustment),
    {
      onSuccess: (res) => {
        if (res.hasErrors) {
          return votingError();
        }

        if (res.data.message !== "SUCCESS") {
          return votingError();
        }

        // no need for a success toast, the UI will update automatically
        queryClient.invalidateQueries([QueryKeys.ImageList]);
      },
      onError: () => {
        votingError();
      },
    }
  );
};

export const useUploadImage = () => {
  const catService = Services();
  const queryClient = useQueryClient();

  // nice to have would be to show a progress bar
  // would also be nice to tell the user which image failed to upload
  const uploadError = () =>
    enqueueSnackbar("Oops, something went wrong while uploading a image.", {
      variant: "error",
      preventDuplicate: true,
    });

  return useMutation(async ({ file }: { file: RcFile }) => await catService.uploadImage(file), {
    onSuccess: (res) => {
      if (res.hasErrors) {
        return uploadError();
      }
      if (res.data.approved) {
        enqueueSnackbar(`Your ${res.data.original_filename} image was uploaded successfully.`, {
          variant: "success",
        });
      }
      if (res.data.approved === 0) {
        uploadError();
      }
      queryClient.invalidateQueries([QueryKeys.ImageList]);
    },
    onError: () => {
      uploadError();
    },
  });
};

export const useManageFavourite = () => {
  const catService = Services();
  const queryClient = useQueryClient();

  const favouritingError = (action: "favouriting" | "unfavouriting") =>
    enqueueSnackbar(`Oops, something went wrong while ${action} that image.`, {
      variant: "error",
    });

  const isAddFavouriteRequest = (request: FavouriteRequest): request is { imageId: string; favouriteId?: never } =>
    !!request.imageId;

  return useMutation(
    async (request: FavouriteRequest) => {
      return await (isAddFavouriteRequest(request)
        ? catService.addFavourite(request.imageId)
        : catService.removeFavourite(request.favouriteId));
    },
    {
      onSuccess: (res) => {
        const action = res.method === "DELETE" ? "unfavouriting" : "favouriting";
        if (res.hasErrors) {
          return favouritingError(action);
        }

        if (res.data.message !== "SUCCESS") {
          return favouritingError(action);
        }

        if (res.data.message === "SUCCESS") {
          queryClient.invalidateQueries([QueryKeys.ImageList]);
          return enqueueSnackbar(
            `Your image was ${res.data.id ? "added to" : "removed from"} favourites successfully.`,
            {
              variant: "success",
            }
          );
        }
      },
      onError: (err) => {
        enqueueSnackbar(`Oops, something went wrong.`, {
          variant: "error",
        });
      },
    }
  );
};
