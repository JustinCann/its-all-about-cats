import { RouteKeys } from "@Constants";
import { useCols } from "@Hooks";
import { useUploadImage } from "@Mutations";
import { Button, ButtonGroup, CircularProgress, ImageList, ImageListItem, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import Upload from "rc-upload";
import { RcFile } from "rc-upload/lib/interface";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VALID_TYPES = ["image/jpeg", "image/png", "image/gif"];

const Uploader: React.FC = () => {
  // ** Hooks ** //
  const navigate = useNavigate();
  const { mutateAsync: upload, isLoading: isUploading } = useUploadImage();
  const cols = useCols();

  // ** State Hooks ** //
  const [previewSources, setPreviewSources] = useState<string[]>([]);
  const [pendingFiles, setPendingFiles] = useState<RcFile[]>([]);

  // ** Handlers ** //

  /**
   * Handles the upload of the pending file
   */
  const handleUpload = async () => {
    if (pendingFiles && pendingFiles.length > 0) {
      const uploadPromises = pendingFiles.map((file) => (file.size > 0 ? upload({ file }) : Promise.resolve()));

      Promise.all(uploadPromises).then((responses) => {
        if (responses.some((response) => response?.hasErrors)) return null; // don't navigate if there were errors
        navigate(RouteKeys.Home);
      });
    }
  };

  /**
   * This function is called before the file is uploaded.
   * It is used to validate the file type and set the preview image.
   */
  const handleBeforeUpload = (file: RcFile) => {
    const isValidType = file?.type?.includes("image");
    if (!isValidType) {
      enqueueSnackbar("Invalid file type. Please select an image file.", {
        variant: "error",
      });

      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = typeof e?.target?.result === "string" ? e.target.result : undefined;
      if (!!src) setPreviewSources((sources) => [...sources, src]);
    };
    reader.readAsDataURL(file);

    setPendingFiles((files) => {
      return [...files, file];
    });

    // we don't want to use the default upload behavior
    return false;
  };

  const handleReset = () => {
    setPreviewSources([]);
    setPendingFiles([]);
  };

  // ** Render ** //

  return (
    <>
      <Typography sx={{ mb: 3 }} color="text.secondary" variant="h2">
        Upload a Cat Image
      </Typography>
      <Upload
        accept={VALID_TYPES.join(",")}
        beforeUpload={(file) => handleBeforeUpload(file)}
        disabled={isUploading}
        multiple
        name={"file"}
      >
        <ButtonGroup>
          <Button
            disabled={isUploading}
            variant={pendingFiles.length === 0 ? "contained" : "outlined"}
            sx={{ px: 2.5 }}
            onClick={handleReset}
          >
            {pendingFiles.length === 0 ? "Select Images" : "Change Images"}
          </Button>
          {pendingFiles.length > 0 ? (
            <Button
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                handleUpload();
              }}
              sx={{ pr: 2.5 }}
            >
              <CircularProgress color="inherit" size={16} sx={{ opacity: isUploading ? 1 : 0, ml: -1.5, mr: 0.5 }} />{" "}
              Upload
            </Button>
          ) : null}
        </ButtonGroup>
      </Upload>
      {previewSources.length ? (
        <>
          <Typography sx={{ mt: 3 }} color="text.secondary" variant="h3">
            Preview
          </Typography>
          <ImageList variant="masonry" cols={cols} gap={8}>
            {previewSources.map((src) => (
              <ImageListItem key={src}>
                <img src={src} alt="Preview" />
              </ImageListItem>
            ))}
          </ImageList>
        </>
      ) : null}
    </>
  );
};

export default Uploader;
