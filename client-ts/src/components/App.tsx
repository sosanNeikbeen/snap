import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import PrivateRoute from "./Routes/PrivateRoute";
import { PostProvider } from "../context/PostContext";
import { CommentProvider } from "../context/CommentContext";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "react-toast-notifications";
import PostCreate from "./Posts/PostCreate";
import PostList from "./Posts/PostList";
import PostDetail from "./Posts/PostDetail";
import PostDelete from "./Posts/PostDelete";
import PostEdit from "./Posts/PostEdit";
import Profile from "./Profile";
import ProfileEdit from "./ProfileEdit";
import CommentDelete from "./Comments/CommentDelete";
import CommentEdit from "./Comments/CommentEdit";
import Conversations from "./Conversations/ConversationList";
import Message from "./Conversations/Messenger";
import Signup from "./Authentication/Register";
import Login from "./Authentication/Login";

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
                    <PrivateRoute
                      path="/conversations"
                      exact
                      component={Conversations}
                    />
                    <PrivateRoute
                      path="/message/:id"
                      exact
                      component={Message}
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
