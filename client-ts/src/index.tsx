import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import "./styles/bulma.css";
import "./styles/brand.scss";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import de from "javascript-time-ago/locale/de";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(de);

ReactDOM.render(<App />, document.querySelector("#root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
