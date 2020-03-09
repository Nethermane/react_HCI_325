import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { GlobalStateProvider } from "./UseGlobalState";

ReactDOM.render(
  <GlobalStateProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalStateProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
