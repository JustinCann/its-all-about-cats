import { useAdjustVotes } from "@Mutations";
import { Adjustment } from "@Types";
import { pluralise } from "@Utils";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Box, IconButton, ImageListItemBar, ImageListItemBarProps, useTheme } from "@mui/material";
import React from "react";

interface VotingBarProps extends ImageListItemBarProps {
  imageId: string;
  score: number;
  votes: number;
}

const VotingBar: React.FC<VotingBarProps> = ({ imageId, score, votes, ...otherProps }) => {
  const { mutateAsync: adjustVote } = useAdjustVotes(imageId);
  const theme = useTheme(); // Get the current theme
  const handleClick = async (adjustment: Adjustment) => adjustVote({ adjustment });
  return (
    <ImageListItemBar
      actionIcon={
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <IconButton onClick={() => handleClick(1)} color="primary">
            <ThumbUpIcon />
          </IconButton>
          <IconButton onClick={() => handleClick(-1)} sx={{ color: theme.palette.secondary.dark }}>
            <ThumbDownIcon />
          </IconButton>
        </Box>
      }
      title={`Score: ${score}`}
      position="below"
      subtitle={`${votes} ${pluralise("vote", votes)}`}
      sx={{ px: 2 }}
      {...otherProps}
    />
  );
};

export default VotingBar;
