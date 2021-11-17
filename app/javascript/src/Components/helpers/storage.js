const setToLocalStorage = ({ authToken, email, userId, userName, role }) => {
  localStorage.setItem("authToken", authToken);
  localStorage.setItem("authEmail", email);
  localStorage.setItem("authUserId", userId);
  localStorage.setItem("userName", userName);
  localStorage.setItem("role", role);
};

const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

const clearFromLocalStorage = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authEmail");
  localStorage.removeItem("authUserId");
  localStorage.removeItem("userName");
  localStorage.removeItem("role");
};

export { setToLocalStorage, getFromLocalStorage, clearFromLocalStorage };
