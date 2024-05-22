"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1c2039",
      paper: "#262b49",
    },
    text: {
      primary: "#eaf0ff",
      secondary: "#4e5570",
      disabled: "#323755",
    },
    primary: {
      main: "#e0305a",
      contrastText: "#eaf0ff",
    },
    secondary: {
      main: "#ffffff",
      contrastText: "#4e5570",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: "12px",
        },
      },
    },
  },
});

export default theme;
