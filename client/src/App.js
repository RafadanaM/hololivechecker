import "./App.css";

import { React } from "react";
import Routes from "./Routes";
import { StylesProvider } from "@material-ui/core/styles"; // <-- import this component, and wrap your App.

function App() {
  return (
    <StylesProvider injectFirst>
      <Routes />
    </StylesProvider>
  );
}

export default App;
