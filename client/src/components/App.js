import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import PrivateRoute from "./routes/PrivateRoute";
import { PostProvider } from "../context/PostContext";
import { CommentProvider } from "../context/CommentContext";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "react-toast-notifications";
import PostCreate from "./posts/PostCreate";
import PostList from "./posts/PostList";
import PostDetail from "./posts/PostDetail";
import PostDelete from "./posts/PostDelete";
import PostEdit from "./posts/PostEdit";
import Profile from "./Profile";
import ProfileEdit from "./ProfileEdit";
import CommentDelete from "./comments/CommentDelete";
import CommentEdit from "./comments/CommentEdit";
import Signup from "./authentication/Register";
import Login from "./authentication/Login";

const App = () => {
  return (
    <div className="container">
      <Router>
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
