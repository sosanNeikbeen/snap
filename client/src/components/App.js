import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import PostCreate from "./posts/PostCreate";
import PostList from "./posts/PostList";
import history from "../history";
import { GoogleAuthProvider } from "../context/AuthContext";
import { PostProvider } from "../context/PostContext";
import { CommentProvider } from "../context/CommentContext";
import PostDetail from "./posts/PostDetail";
import PostDelete from "./posts/PostDelete";
import PostEdit from "./posts/PostEdit";
import Profile from "./Profile";
import CommentDelete from "./comments/CommentDelete";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <GoogleAuthProvider>
            <CommentProvider>
              <PostProvider>
                <Header />
                <Switch>
                  <Route path="/" exact component={PostList} />
                  <Route path="/posts/new" exact component={PostCreate} />
                  <Route path="/posts/edit/:id" exact component={PostEdit} />
                  <Route
                    path="/posts/delete/:id"
                    exact
                    component={PostDelete}
                  />
                  <Route path="/posts/:id" exact component={PostDetail} />
                  <Route
                    path="/comments/delete/:id"
                    exact
                    component={CommentDelete}
                  />
                  <Route path="/profile" exact component={Profile} />
                </Switch>
              </PostProvider>
            </CommentProvider>
          </GoogleAuthProvider>
        </div>
      </Router>
    </div>
  );
};

export default App;
