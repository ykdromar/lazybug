import { API_URLS, getFormBody, LOCALSTORAGE_TOKEN_KEY } from "../utils";
const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = getFormBody(body);
  }
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }
    // console.log(response);
    throw new Error(data.message);
  } catch (error) {
    console.log("Error in Fetching Data: ", error);
    return {
      message: error.message,
      success: false,
    };
  }
};
// function to get all the posts
export const getPosts = (page = 1, limit = 100) => {
  return customFetch(API_URLS.posts(page, limit), { method: "GET" });
};
// function to login
export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: "POST",
    body: { email, password },
  });
};
//function to signup
export const signup = (name, email, password, confirm_password) => {
  return customFetch(API_URLS.signup(), {
    method: "POST",
    body: { name, email, password, confirm_password },
  });
};
//function to update
export const updateUser = (id, name, password, confirm_password) => {
  return customFetch(API_URLS.editUser(), {
    method: "POST",
    body: { id, name, password, confirm_password },
  });
};
//function to fetch user details
export const userInfo = (userId) => {
  return customFetch(API_URLS.userInfo(userId), {
    method: "GET",
  });
};
// function to fetch the user friends
export const fetchUserFriends = () => {
  return customFetch(API_URLS.friends(), {
    method: "GET",
  });
};

//function to add a friend
export const addFriend = (userId) => {
  return customFetch(API_URLS.createFriendship(userId), {
    method: "POST",
  });
};

//function to remove a friend
export const removeFriend = (userId) => {
  return customFetch(API_URLS.removeFriend(userId), {
    method: "POST",
  });
};

// function to add Post
export const addPost = (content) => {
  return customFetch(API_URLS.createPost(), {
    method: "POST",
    body: {
      content,
    },
  });
};
