
export const clearToken = () => {
  sessionStorage.removeItem("token");
};

export const isTokenStoraged = () => {
  return !!sessionStorage.getItem("token");
};

export const getTokenStoraged = () => {
  return JSON.parse(sessionStorage.getItem("token"));
};

export const saveToken = (token) => {
  sessionStorage.setItem("token", JSON.stringify(token));
};

export const getStorage = (data) => {
  return sessionStorage.getItem(data);
};

export const setStorage = (key, value) => {
  return sessionStorage.setItem(key, value);
};
