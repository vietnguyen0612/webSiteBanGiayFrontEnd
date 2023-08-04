export const loginSuccess = (user) => {
    return {
      type: 'LOGIN_SUCCESS',
      payload: user,
    };
  };

  
export const logoutSuccess = () => {
    return {
      type: 'LOGOUT_SUCCESS',
    };
  };