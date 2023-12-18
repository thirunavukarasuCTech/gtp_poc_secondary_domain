
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = (user: any) => ({
  type: LOGIN,
  payload: { user },
});

export const logout = () => ({
  type: LOGOUT,
});
