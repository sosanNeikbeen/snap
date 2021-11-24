import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  FC,
} from "react";
import xhr from "../utils/xhr";
import jwt from "jsonwebtoken";
import { User, RegisterUserData, LoginUserData } from "../interfaces/index";

interface AuthProviderValues {
  createUser: (data: RegisterUserData) => void;
  loginUser: (data: LoginUserData) => void;
  logoutUser: () => void;
  fetchUser: any;
  editUserProfile: any;
  currentUser: User;
  userRefetch: () => void;
}

const initialProviderValue: AuthProviderValues = {
  logoutUser: () => {},
  createUser: () => {},
  loginUser: () => {},
  fetchUser: () => {},
  editUserProfile: () => {},
  currentUser: {
    userId: "",
    email: "",
    name: "",
    location: "",
    picture: "",
    isLoggedIn: false,
  },
  userRefetch: () => {
    throw new Error("edit user Function hasn't been provided");
  },
};

const AuthContext = createContext<AuthProviderValues>(initialProviderValue);

export const AuthProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>({
    userId: "",
    email: "",
    name: "",
    location: "",
    picture: "",
    isLoggedIn: false,
  });

  const createUser = async (data: RegisterUserData) => {
    return await xhr.post("/users/signup", data);
  };

  const loginUser = async (data: LoginUserData) => {
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

  const fetchUser = async (id: string) => {
    const res = await xhr.get(`/users/profile/${id}`);
    return res.data;
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const editUserProfile = async (id: string, data: string) => {
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

  const userRefetch = () => {
    setRefetch(!refetch);
  };

  useEffect(() => {
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
  }, [refetch]);

  const value: AuthProviderValues = {
    currentUser,
    createUser,
    loginUser,
    logoutUser,
    fetchUser,
    editUserProfile,
    userRefetch,
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
