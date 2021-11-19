const setToLocalStorage = userData => {
  const storageItems = [
    "authToken",
    "authEmail",
    "authUserId",
    "userName",
    "role",
  ];
  storageItems.map(item => {
    localStorage.setItem(item, userData[item]);
  });
};

const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

const clearFromLocalStorage = () => {
  localStorage.clear();
};

export { setToLocalStorage, getFromLocalStorage, clearFromLocalStorage };
