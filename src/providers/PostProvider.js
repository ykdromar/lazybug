import { createContext } from "react";
import { useProvidePosts } from "../hooks";
const initialState = {
  posts: [],
  loading: true,
};

export const PostContext = createContext(initialState);

export const PostProvider = ({ children }) => {
  const posts = useProvidePosts();
  return <PostContext.Provider value={posts}>{children}</PostContext.Provider>;
};
