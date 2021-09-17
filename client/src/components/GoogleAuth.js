// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { signIn, signOut } from "../actions";

// const GoogleAuth = (props) => {
//   const [auth, setAuth] = useState({});
//   console.log(window);

//   useEffect(() => {
//     window.gapi.load("client:auth2", () => {
//       window.gapi.client
//         .init({
//           clientId:
//             "227955560876-biaiuf02utgri02oood3oa484tr3jjqm.apps.googleusercontent.com",
//           scope: "email",
//         })
//         .then(() => {
//           setAuth(window.gapi.auth2.getAuthInstance());
//           const authChange = onAuthChange(auth.isSignedIn.get());
//           auth.isSignedIn.listen(authChange);
//         });
//     });
//   }, []);

//   const onAuthChange = (isSignedIn) => {
//     if (isSignedIn) {
//       const userId = auth.currentUser.get().getId();
//       props.signIn(userId);
//     } else {
//       props.signOut();
//     }
//   };
//   // console.log(auth);

//   const onSignInClick = () => {
//     auth.signIn();
//   };

//   const onSignOutClick = () => {
//     auth.signOut();
//   };

//   const renderAuthButton = () => {
//     if (props.isSignedIn === null) {
//       return null;
//     } else if (props.isSignedIn) {
//       return (
//         <button className="ui red google button" onClick={onSignOutClick}>
//           <i className="google icon" />
//           Sign Out
//         </button>
//       );
//     } else {
//       return (
//         <button className="ui red google button" onClick={onSignInClick}>
//           <i className="google icon" />
//           Sign In with Google
//         </button>
//       );
//     }
//   };

//   return <div>{renderAuthButton()}</div>;
// };

// const mapStateToProps = (state) => {
//   return { isSignedIn: state.auth.isSignedIn };
// };

// export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

import React from "react";
import { useGoogleAuth } from "../context/AuthContext";

const GoogleAuth = () => {
  const { signIn, signOut, isSignedIn } = useGoogleAuth();
  // console.log(useGoogleAuth().auth2.currentUser.get().getId());

  const renderAuthButton = () => {
    if (isSignedIn) {
      return (
        <button className="ui red google button" onClick={signOut}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={signIn}>
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  };
  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
