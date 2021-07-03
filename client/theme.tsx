import { createTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#979797",
    },
    secondary: {
      main: "#ffffff",
    },
    error: {
      main: "#ff0000",
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
