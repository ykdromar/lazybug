import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { login as userLogin, signup as userSignUp } from "../api";
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemInLocalStorage,
  getItemInLocalStorage,
} from "../utils";
import jwtDecode from "jwt-decode";
export const useAuth = () => {
  return useContext(AuthContext);
};
export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const userToken = getItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    if (userToken) {
      const user = jwtDecode(userToken);
      setUser(user);
      setLoading(false);
    }
  }, []);
  const login = async (email, password) => {
    const response = await userLogin(email, password);
    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  const logout = () => {
    setUser(null);
    removeItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };
  const signup = async (name, email, password, confirmPassword) => {
    const response = await userSignUp(name, email, password, confirmPassword);
    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  return {
    user,
    login,
    logout,
    signup,
    loading,
  };
};
