// import { API_URLS, LOCALSTORAGE_TOKEN_KEY } from "./constants";
// export { API_URLS, LOCALSTORAGE_TOKEN_KEY };
export * from "./constants";

export const getFormBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123

    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.join("&"); // 'username=aakash&password=123213'
};
// function to set item in local storage
export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.error("Cannot store in local storage");
  }
  const valueToStore =
    typeof value === "string" ? value : JSON.stringify(value);
  localStorage.setItem(key, valueToStore);
};
// function to get item form loacl storage
export const getItemInLocalStorage = (key) => {
  if (!key) {
    return console.error("Cannot get from local storage");
  }

  return localStorage.getItem(key);
};
// function to remove item from local storage
export const removeItemInLocalStorage = (key) => {
  if (!key) {
    return console.error("Cannot get from local storage");
  }

  return localStorage.removeItem(key);
};
