import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import StreamCreate from "./streams/StreamCreate";
import PostCreate from "./posts/PostCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import PostList from "./posts/PostList";
import StreamShow from "./streams/StreamShow";
import history from "../history";
import { GoogleAuthProvider } from "../context/AuthContext";
import { StreamProvider } from "../context/StreamContext";
import { PostProvider } from "../context/PostContext";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <GoogleAuthProvider>
            <StreamProvider>
              <PostProvider>
                <Header />
                <Switch>
                  <Route path="/" exact component={PostList} />
                  <Route path="/posts/new" exact component={PostCreate} />
                  <Route path="/streams/new" exact component={StreamCreate} />
                  <Route
                    path="/streams/edit/:id"
                    exact
                    component={StreamEdit}
                  />
                  <Route
                    path="/streams/delete/:id"
                    exact
                    component={StreamDelete}
                  />
                  <Route path="/streams/:id" exact component={StreamShow} />
                </Switch>
              </PostProvider>
            </StreamProvider>
          </GoogleAuthProvider>
        </div>
      </Router>
    </div>
  );
};

export default App;
