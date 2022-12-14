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
export const getPosts = (page = 1, limit = 10) => {
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
