import React from "react";
import ReactDOM from "react-dom/client";
import "./index.style.scss";
import App from "./App";

declare global {
  interface Window {
    Handlebars: {
      compile: (template: string) => (data: Object) => string;
    };
    daum: any;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
