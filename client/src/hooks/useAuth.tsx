// @ts-nocheck
import axios from "axios";
import React, {
  useState,
  useContext,
  createContext,
  FunctionComponent,
} from "react";
import { User } from "../types/user";

interface AuthContextType {
  user: User;
  login: (username: string, password: string) => {};
  signup: (email: string, password: string, hatchwaysId: string) => {};
  logout: () => {};
  validateAuthToken: () => {};
}

const AuthContext = createContext({} as AuthContextType);

const ProvideAuth: FunctionComponent = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext<AuthContextType>(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const login = async (email: string, password: string) => {
    try {
      const resp = await axios.post("/api/login", { email, password });
      if (resp.data.error) return resp.data.error;
      if (resp.data.token) {
        await localStorage.setItem("token", resp.data.token);
      }
      validateAuthToken();
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const signup = async (
    email: string,
    password: string,
    hatchwaysId: string,
  ) => {
    try {
      const resp = await axios.post("/api/users", {
        email,
        password,
        hatchwaysId,
      });
      if (resp.data.error) return resp.data.error;
      if (resp.data.user && resp.data.token) {
        setUser(resp.data.user);
        await localStorage.setItem("token", resp.data.token);
        return null;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const logout = async () => {
    await localStorage.removeItem("token");
    setUser(null);
  };

  const validateAuthToken = async () => {
    try {
      const resp = await axios.get("/api/user");
      if (resp.status === 401) {
        await logout();
      }
      const userData = resp.data;
      if (!user) {
        setUser(userData);
      }
    } catch (error) {
      console.error("error validating token");
    }
  };

  return {
    user,
    login,
    signup,
    logout,
    validateAuthToken,
  };
}
export default ProvideAuth;
