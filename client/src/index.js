import React from "react";
import ReactDOM from "react-dom";
import "./styles/bulma.css";
import "./styles/brand.scss";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import de from "javascript-time-ago/locale/de";
import App from "./components/App";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(de);

ReactDOM.render(<App />, document.querySelector("#root"));
