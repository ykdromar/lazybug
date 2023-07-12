const API_ROOT = "https://codeial.codingninjas.com:8000/api/v2";
// const NEW_API_ROOT = "https://codeial.ykdromar.me/api/v1";
const NEW_API_ROOT = "https://api.cherrybuds.in/api/v1";

// doc url - https://www.notion.so/aakashcn/Codeial-API-docs-3a4d0b5a42c54f0a94d951a42aabc13f
export const API_URLS = {
  login: () => `${NEW_API_ROOT}/users/login/`, //`${API_ROOT}/users/login`,
  signup: () => `${NEW_API_ROOT}/users/signup/`, //`${API_ROOT}/users/signup`,
  posts: (page, limit) => `${NEW_API_ROOT}/posts/`, //`${API_ROOT}/posts?page=${page}&limit=${limit}`,
  createPost: () => `${NEW_API_ROOT}/posts/create/`, //`${API_ROOT}/posts/create`,
  createFriendship: (userId) =>
    `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
  friends: () => `${API_ROOT}/friendship/fetch_user_friends`,
  removeFriend: (userId) =>
    `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
  toggleLike: (itemId, itemType) =>
    `${NEW_API_ROOT}/likes/toggle?id=${itemId}&type=${itemType}`, // itemType is 'Post'/'Comment'
  getLikes: (itemId, itemType) =>
    `${API_ROOT}/likes?likeable_id=${itemId}&likeable_type=${itemType}`,
  comment: () => `${NEW_API_ROOT}/comments`, // POST - create, GET - list of comments
  deleteComment: (commentId) => `${API_ROOT}/comments?comment_id=${commentId}`,
  editUser: () => `${NEW_API_ROOT}/users/edit`, //`${API_ROOT}/users/edit`,
  userInfo: (userId) => `${NEW_API_ROOT}/users/${userId}`,
  searchUsers: (searchText) =>
    `${NEW_API_ROOT}/users/search?text=${searchText}`,
};

export const LOCALSTORAGE_TOKEN_KEY = "__codeial_token__";
