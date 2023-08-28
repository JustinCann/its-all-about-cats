import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { darken } from "polished";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#273469",
      dark: "#1e2749",
    },
    secondary: {
      main: "#e4d9ff",
      dark: darken(0.25, "#e4d9ff"),
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
    },
    h2: {
      fontSize: "1.5rem",
    },
    h3: {
      fontSize: "1.25rem",
    },
  },
});

export default theme;
