const setToLocalStorage = userData => {
  for (const key in userData) {
    localStorage.setItem(key, userData[key]);
  }
};

const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

const clearFromLocalStorage = () => {
  localStorage.clear();
};

export { setToLocalStorage, getFromLocalStorage, clearFromLocalStorage };
