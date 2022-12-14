import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";

const rootContainer = document.getElementById("root");

const root = ReactDOM.createRoot(rootContainer);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
