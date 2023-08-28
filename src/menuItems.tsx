import DashboardLink from "@Components/shared/DashboardLink";
import { RouteKeys } from "@Constants";
import { Dashboard as DashboardIcon, Upload as UploadIcon } from "@mui/icons-material";
import { ListItemButton, ListItemIcon } from "@mui/material";
import React from "react";

export const mainListItems = (
  <>
    <DashboardLink to={RouteKeys.Home}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        Image List
      </ListItemButton>
    </DashboardLink>
    <DashboardLink to={RouteKeys.Upload}>
      <ListItemButton>
        <ListItemIcon>
          <UploadIcon />
        </ListItemIcon>
        Upload a Cat Image
      </ListItemButton>
    </DashboardLink>
  </>
);
