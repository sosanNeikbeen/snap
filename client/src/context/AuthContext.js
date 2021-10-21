import React, { useContext, createContext, useEffect, useState } from "react";
import xhr from "../utils/xhr";
import jwt from "jsonwebtoken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    userId: "",
    email: "",
    name: "",
    location: "",
    isLoggedIn: false,
  });

  const createUser = async (data) => {
    return await xhr.post("/users/signup", data);
  };

  const loginUser = async (data) => {
    const res = await xhr.post("/users/login", data);
    localStorage.setItem("token", res.data.token);
    const decoded = jwt.decode(res.data.token);
    if (decoded) {
      setCurrentUser({
        ...currentUser,
        userId: decoded.id,
        email: decoded.email,
        name: decoded.name,
        location: decoded.location,
        picture: decoded.picture,
        isLoggedIn: true,
      });
    }

    return res;
  };

  const fetchUser = async (id) => {
    const res = await xhr.get(`/users/profile/${id}`);
    // console.log(res.data);
    return res.data;
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const editUserProfile = async (id, data) => {
    try {
      await xhr.put(`/users/edit/${id}`, data);
      const token = localStorage.getItem("token");
      const decoded = jwt.decode(token);
      if (decoded) {
        const res = await fetchUser(decoded.id);
        setCurrentUser({
          ...currentUser,
          userId: res._id,
          email: res.email,
          name: res.name,
          location: res.location,
          picture: res.picture,
          isLoggedIn: true,
        });
      }

      console.log("profile updated");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("im called");
    const getUser = async () => {
      const token = localStorage.getItem("token");
      const decoded = jwt.decode(token);
      if (decoded) {
        const res = await fetchUser(decoded.id);
        setCurrentUser({
          ...currentUser,
          userId: res._id,
          email: res.email,
          name: res.name,
          location: res.location,
          picture: res.picture,
          isLoggedIn: true,
        });
      }
      setLoading(false);
    };
    getUser();
  }, []);

  // console.log(currentUser, "user");

  const value = {
    currentUser,
    createUser,
    loginUser,
    logoutUser,
    fetchUser,
    editUserProfile,
  };

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
