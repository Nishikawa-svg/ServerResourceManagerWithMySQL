const TOKEN_KEY = "srm_auth_id";

export const login = () => {
  localStorage.setItem(TOKEN_KEY, 1);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }
  return false;
};
