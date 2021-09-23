import React from "react";
import ReactDOM from "react-dom";
import "./styles/bulma.css";
import "./styles/brand.scss";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import de from "javascript-time-ago/locale/de";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(de);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
