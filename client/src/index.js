import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "./components/layout/AppLayout";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout>
          <App />
        </AppLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
