import { DashboardBar, DashboardDrawer } from "@Styles/layoutStyles";
import { ChevronLeft as ChevronLeftIcon, Menu as MenuIcon } from "@mui/icons-material";
import {
  Box,
  Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  List,
  Paper,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { mainListItems } from "./../menuItems";

export function Layout() {
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(!isSmallScreen);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleResize = () => {
      if (open && isSmallScreen) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up the listener when the component unmounts
      window.removeEventListener("resize", handleResize);
    };
  }, [isSmallScreen, open]);

  return (
    <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <DashboardBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            {!isSmallScreen ? (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : null}
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              It's all about Cats
            </Typography>
            {/* A nice to have would have been storing the toasts and displaying them as notifications */}
            {/* <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </DashboardBar>
        <DashboardDrawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </DashboardDrawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column", minHeight: 300 }}>
                  <Outlet />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </SnackbarProvider>
  );
}

export default Layout;
