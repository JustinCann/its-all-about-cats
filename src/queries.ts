import { QueryKeys } from "@Constants";
import Services from "@Services";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { GetImagesParams, GetImagesResponseItem, ImagesWithMetadata } from "@Types";
import { groupBy } from "@Utils";

export const useGetImages = (params: GetImagesParams = {}) => {
  const catService = Services();

  const error = () =>
    enqueueSnackbar("Oops, something went wrong while fetching the images.", {
      variant: "error",
      preventDuplicate: true,
    });

  return useQuery<ImagesWithMetadata[]>(
    [QueryKeys.ImageList],
    async () => {
      const fetchAllImages = async (
        page = 0,
        accumulatedImages: GetImagesResponseItem[] = []
      ): Promise<GetImagesResponseItem[]> => {
        const currentPageImages = await catService.getImages({ ...params, page });

        if (currentPageImages.hasErrors) {
          error();
          return [];
        }

        // If no images, return what we've accumulated so far
        if (currentPageImages.data.length === 0) {
          return accumulatedImages;
        }

        // Otherwise, fetch the next page and add current images to the accumulation
        return fetchAllImages(page + 1, accumulatedImages.concat(currentPageImages.data));
      };

      const images = await fetchAllImages();
      const favourites = await catService.getFavourites();
      const votes = await catService.getVotes();

      if (favourites.hasErrors || votes.hasErrors) {
        error();
        return [];
      }

      const favouritesMap = new Map(favourites.data.map((favourite) => [favourite.image_id, favourite]));
      const votesMap = groupBy(votes.data, "image_id");
      const imagesWithMetadata = images.map((image) => {
        const isFavourite = Array.from(favouritesMap.keys()).includes(image.id);
        return {
          ...image,
          isFavourite,
          favouriteId: isFavourite ? favouritesMap.get(image.id)?.id : undefined,
          votes: votesMap.get(image.id)?.length ?? 0,
          // Number of up votes - Number of down votes - minus values are allowed
          score: votesMap.get(image.id)?.reduce((acc, vote) => acc + vote.value, 0) ?? 0,
        };
      });

      return imagesWithMetadata;
    },
    {
      initialData: [],
      refetchOnWindowFocus: false, // turned off to prevent refetching when tab is switched, would have been enabled if state time was set
      // staleTime: 3 * 60 * 1000, //  3 minutes  // ** omitting state time to demonstrate refetching
      onError(err) {
        console.error(err); // eslint-disable-line no-console
        error();
      },
    }
  );
};
