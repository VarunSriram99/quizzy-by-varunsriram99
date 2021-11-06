const setToLocalStorage = ({ authToken, email, userId, userName }) => {
  localStorage.setItem("authToken", authToken);
  localStorage.setItem("authEmail", email);
  localStorage.setItem("authUserId", userId);
  localStorage.setItem("userName", userName);
};

const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

const clearFromLocalStorage = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authEmail");
  localStorage.removeItem("authUserId");
  localStorage.removeItem("userName");
};

export { setToLocalStorage, getFromLocalStorage, clearFromLocalStorage };
