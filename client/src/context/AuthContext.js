// import React, { useContext, createContext, useState, useEffect } from "react";
// import { useGoogleLogin } from "react-use-googlelogin";

// const GoogleAuthContext = createContext();

// export const GoogleAuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState();

//   const googleAuth = useGoogleLogin({
//     clientId:
//       "227955560876-biaiuf02utgri02oood3oa484tr3jjqm.apps.googleusercontent.com", // Your clientID from Google.
//   });

//   const { isSignedIn, auth2 } = googleAuth;

//   useEffect(() => {
//     // const getUserId = () => {
//     //   if (isSignedIn) {
//     //     setCurrentUser({
//     //       ...currentUser,
//     //       userId: auth2.currentUser.get().getId(),
//     //     });
//     //   }
//     // };
//     // getUserId();
//     const getUser = async () => {
//       const result = await googleAuth.auth2;
//       console.log(result);
//       setCurrentUser(result);
//     };

//     getUser();
//   }, []);

//   if (currentUser) {
//     console.log(currentUser);
//   }

//   setTimeout(() => {
//     console.log(auth2.currentUser.get().getId());
//   }, 6000);

//   return (
//     <GoogleAuthContext.Provider value={googleAuth}>
//       {children}
//     </GoogleAuthContext.Provider>
//   );
// };

// export const useGoogleAuth = () => useContext(GoogleAuthContext);

import React, { useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const createUser = (data) => {
    try {
      axios.post("/users/signup", data);
      console.log("user added");
    } catch (error) {
      console.log(error);
    }
  };
  const loginUser = (data) => {
    try {
      axios.post("/users/login", data);
      console.log("user logged in");
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    createUser,
    loginUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
