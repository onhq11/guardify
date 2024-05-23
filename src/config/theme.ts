import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1e1e1e",
      paper: "#171717",
    },
    text: {
      primary: "#eaf0ff",
      secondary: "#4a505f",
      disabled: "#cad0df",
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
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          borderRadius: "9px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "9px",
          },
        },
      },
    },
  },
});

export default theme;
