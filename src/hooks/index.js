import { useContext, useEffect, useState } from "react";
import { AuthContext, PostContext } from "../providers";
import {
  fetchUserFriends,
  login as userLogin,
  signup as userSignUp,
  updateUser as updateProfile,
  getPosts,
} from "../api";
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
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
      if (userToken) {
        const user = jwtDecode(userToken);
        setUser(user);
        const response = await fetchUserFriends();
        if (response.success) {
          setFriends(response.data.friends);
        } else {
          setFriends([]);
        }
      }
      setLoading(false);
    };
    getUser();
  }, []);
  const login = async (email, password) => {
    const response = await userLogin(email, password);
    if (response.success) {
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      setUser(response.data.user);
      const response2 = await fetchUserFriends();
      if (response2.success) {
        setFriends(response2.data.friends);
      } else {
        setFriends([]);
      }
      console.log(response.data);
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
  const updateUser = async (id, name, password, confirmPassword) => {
    const response = await updateProfile(id, name, password, confirmPassword);
    console.log(response);
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
  const updateUserFriends = (addFriend, friend) => {
    if (addFriend) {
      setFriends([...friends, friend]);
    } else {
      let newFriends = friends.filter((newFriend) => {
        return newFriend.to_user._id !== friend ? newFriend : null;
      });
      console.log(newFriends);
      setFriends(newFriends);
    }
    return;
  };
  return {
    user,
    friends,
    login,
    logout,
    signup,
    loading,
    updateUser,
    updateUserFriends,
  };
};

// useProvidePosts hook
export const useProvidePosts = () => {
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);
  const addPostToState = (post) => {
    const newPosts = [post, ...posts];
    setPosts(newPosts);
  };
  const addCommentToState = (comment, postId) => {
    const newPosts = posts.map((post) => {
      if (post._id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      } else {
        return post;
      }
    });
    setPosts(newPosts);
  };
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  return {
    posts,
    loading,
    addPostToState,
    addCommentToState,
  };
};

//usePosts hook
export const usePosts = () => {
  return useContext(PostContext);
};
