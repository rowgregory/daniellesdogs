import jwtDecode from 'jwt-decode';

export const authToken = () => {
  const bearer = localStorage.getItem('token') || '';

  const setToken = (authToken) => localStorage.setItem('token', authToken);

  const removeToken = () => localStorage.clear();

  const getTokenState = (token) => {
    if (!token) {
      return { valid: false, needRefresh: true };
    }

    const decoded = jwtDecode(token);

    if (!decoded) {
      return { valid: false, needRefresh: true };
    }
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return { valid: false, needRefresh: true };
    }
    return { valid: true, needRefresh: false };
  };

  return { bearer, setToken, removeToken, getTokenState };
};
