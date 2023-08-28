import { FavoriteBorder as FavoriteBorderIcon, Favorite as FavoriteIcon } from "@mui/icons-material";
import { IconButton, IconButtonProps, useTheme } from "@mui/material";
import { rgba } from "polished";
import React from "react";
import { useManageFavourite } from "@Mutations";

interface FavouriteButtonProps extends IconButtonProps {
  favouriteId?: number;
  imageId: string;
  isFavourite: boolean;
}

function isFavouriteDefined(props: FavouriteButtonProps): props is FavouriteButtonProps & { favouriteId: number } {
  return props.isFavourite === true;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = (props) => {
  const { favouriteId, imageId, isFavourite, ...otherProps } = props;
  const theme = useTheme();
  const { mutateAsync: toggleFavourite } = useManageFavourite();
  const handleClick = async () => {
    await toggleFavourite(isFavouriteDefined(props) ? { favouriteId: props.favouriteId } : { imageId });
  };
  const title = isFavourite ? "Remove from favourites" : "Add to favourites";
  return (
    <IconButton
      aria-label={title}
      onClick={handleClick}
      title={title}
      sx={{
        backgroundColor: rgba(theme.palette.secondary.main, 0.875),
        position: "absolute",
        right: 5,
        top: 5,
      }}
      {...otherProps}
    >
      {isFavourite ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavouriteButton;
