import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    // Default background color
    background: {
      default: "#F1F1F1",
    },
    primary: {
      main: "#A50B07",
    },
    secondary: {
      main: "#F68F8D",
    },
    tertiary: {
      main: "#1D1D1D",
    },
    text: {
      primary: "#1D1D1D",
      secondary: "#595959",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
