import FavouriteButton from "@Components/imageList/FavouriteButton";
import VotingBar from "@Components/imageList/VotingBar";
import { RouteKeys } from "@Constants";
import { useCols } from "@Hooks";
import { useGetImages } from "@Queries";
import { StyledImageListItem } from "@Styles/imageListStyles";
import { Backdrop, Box, Button, CircularProgress, Divider, ImageList, Pagination, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const PaginatedImageList: React.FC = () => {
  // ** Hooks ** //
  const { data: images, isFetched, isFetching } = useGetImages({ limit: 10 });
  const cols = useCols();

  // ** State Hooks ** //
  const [page, setPage] = useState(1);

  // ** Variables ** //
  const itemsPerPage = cols > 2 ? cols * 2 : cols * 4;
  const displayedImages = images.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // ** Render ** //

  return (
    <>
      <Typography sx={{ mb: 1 }} color="text.secondary" variant="h2">
        {isFetched ? "Here are all of the images that have been uploaded." : "Loading images..."}
      </Typography>
      <Divider style={{ margin: "20px 0" }} />
      {/* Multiple ternaries instead of nesting to improve readability */}
      {/* Ternaries instead of && || operators to improve readability */}
      {!isFetched ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress color="secondary" size={200} sx={{ mx: "auto" }} />
        </Box>
      ) : null}
      {isFetched && images.length > 0 ? (
        <>
          <Pagination
            count={Math.ceil(images.length / itemsPerPage)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
          <ImageList variant="standard" cols={cols} gap={8} sx={{ position: "relative" }}>
            {displayedImages.map((image) => (
              <StyledImageListItem key={image.id}>
                <img src={image.url} alt={image.original_filename} loading="lazy" />
                <FavouriteButton isFavourite={image.isFavourite} favouriteId={image.favouriteId} imageId={image.id} />
                <VotingBar imageId={image.id} score={image.score} votes={image.votes} />
              </StyledImageListItem>
            ))}
            <Backdrop open={isFetching} sx={{ position: "absolute", zIndex: 1 }}>
              <CircularProgress color="secondary" />
            </Backdrop>
          </ImageList>
        </>
      ) : null}
      {isFetched && images.length === 0 ? (
        <Box>
          <Typography sx={{ mb: 3 }} color="text.secondary" variant="h2">
            You have not uploaded any images yet (or there was an error retrieving them).
          </Typography>
          <Link to={RouteKeys.Upload}>
            <Button variant="contained">Go to Uploader</Button>
          </Link>
        </Box>
      ) : null}
    </>
  );
};

export default PaginatedImageList;
