const api = (store) => (next) => (action) => {
  if (typeof action == "function") action();
  else next(action);
};
export default api;
