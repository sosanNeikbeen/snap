import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import history from "../history";
// import { GoogleAuthProvider } from "../context/AuthContext";
import { PostProvider } from "../context/PostContext";
import { CommentProvider } from "../context/CommentContext";
import PostCreate from "./posts/PostCreate";
import PostList from "./posts/PostList";
import PostDetail from "./posts/PostDetail";
import PostDelete from "./posts/PostDelete";
import PostEdit from "./posts/PostEdit";
import Profile from "./Profile";
import CommentDelete from "./comments/CommentDelete";
import Signup from "./authentication/Register";
import Login from "./authentication/Login";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "react-toast-notifications";

const App = () => {
  return (
    <div className="container">
      <Router history={history}>
        <div>
          <AuthProvider>
            <CommentProvider>
              <PostProvider>
                <ToastProvider>
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
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                  </Switch>
                </ToastProvider>
              </PostProvider>
            </CommentProvider>
          </AuthProvider>
        </div>
      </Router>
    </div>
  );
};

export default App;
