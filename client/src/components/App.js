import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import history from "../history";
// import { GoogleAuthProvider } from "../context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import { PostProvider } from "../context/PostContext";
import { CommentProvider } from "../context/CommentContext";
import PostCreate from "./posts/PostCreate";
import PostList from "./posts/PostList";
import PostDetail from "./posts/PostDetail";
import PostDelete from "./posts/PostDelete";
import PostEdit from "./posts/PostEdit";
import Profile from "./Profile";
import ProfileEdit from "./ProfileEdit";
import CommentDelete from "./comments/CommentDelete";
import Signup from "./authentication/Register";
import Login from "./authentication/Login";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "react-toast-notifications";
import CommentEdit from "./comments/CommentEdit";

const App = () => {
  return (
    <div className="container">
      <Router history={history}>
        <div>
          <ToastProvider>
            <AuthProvider>
              <CommentProvider>
                <PostProvider>
                  <Header />
                  <Switch>
                    <PrivateRoute path="/" exact component={PostList} />
                    <PrivateRoute
                      path="/posts/new"
                      exact
                      component={PostCreate}
                    />
                    <PrivateRoute
                      path="/posts/edit/:id"
                      exact
                      component={PostEdit}
                    />
                    <PrivateRoute
                      path="/posts/delete/:id"
                      exact
                      component={PostDelete}
                    />
                    <PrivateRoute
                      path="/posts/:id"
                      exact
                      component={PostDetail}
                    />
                    <PrivateRoute
                      path="/comments/delete/:id"
                      exact
                      component={CommentDelete}
                    />
                    <PrivateRoute
                      path="/comments/edit/:id"
                      exact
                      component={CommentEdit}
                    />
                    <PrivateRoute
                      path="/users/profile/:id"
                      exact
                      component={Profile}
                    />
                    <PrivateRoute
                      path="/users/edit/:id"
                      exact
                      component={ProfileEdit}
                    />
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                  </Switch>
                </PostProvider>
              </CommentProvider>
            </AuthProvider>
          </ToastProvider>
        </div>
      </Router>
    </div>
  );
};

export default App;
