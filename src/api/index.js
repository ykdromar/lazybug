import { API_URLS, getFormBody, LOCALSTORAGE_TOKEN_KEY } from "../utils";
const customFetch = async (url, { body, isMulti, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  const headers = {
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
  if (body && !isMulti) {
    console.log("Not multi");
    config.body = getFormBody(body);
  } else if (body && isMulti) {
    console.log("multi");
    config.body = body;
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
  return customFetch(API_URLS.posts(page, limit), {
    method: "GET",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
};
// function to login
export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: "POST",
    body: { email, password },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
};
//function to signup
export const signup = (name, email, password, confirm_password) => {
  return customFetch(API_URLS.signup(), {
    method: "POST",
    body: { name, email, password, confirm_password },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
};
//function to update
export const updateUser = (name, password, confirm_password, avatar) => {
  let formData = new FormData();
  formData.append("name", name);
  formData.append("password", password);
  formData.append("confirm_password", confirm_password);
  formData.append("avatar", avatar);
  return customFetch(API_URLS.editUser(), {
    method: "POST",
    body: formData,
    isMulti: true,
  });
};
//function to fetch user details
export const userInfo = (userId) => {
  return customFetch(API_URLS.userInfo(userId), {
    method: "GET",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
};
// function to fetch the user friends
export const fetchUserFriends = () => {
  return customFetch(API_URLS.friends(), {
    method: "GET",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
};

//function to add a friend
export const addFriend = (userId) => {
  return customFetch(API_URLS.createFriendship(userId), {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
};

//function to remove a friend
export const removeFriend = (userId) => {
  return customFetch(API_URLS.removeFriend(userId), {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
};

// function to add Post
export const addPost = (content) => {
  return customFetch(API_URLS.createPost(), {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: {
      content,
    },
  });
};

//function to add Comment
export const addComment = (content, post_id, user_id) => {
  return customFetch(API_URLS.comment(), {
    method: "POST",
    body: {
      post_id,
      content,
      user_id,
    },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
};

//function to toggle like
export const toggleLike = (itemId, itemType, user_id) => {
  return customFetch(API_URLS.toggleLike(itemId, itemType), {
    method: "POST",
    body: {
      user_id,
    },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
};

//function to search user
export const searchUser = (searchText) => {
  return customFetch(API_URLS.searchUsers(searchText), {
    method: "GET",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
};
