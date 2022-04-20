/**
 * set user data in local storage
 */
export const setUserLocalStorage = (userData) => {
  if (userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  }
};

/**
 * set user data from local storage
 */
export const getUserLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isValidatedToken = validateToken(user);
  if (isValidatedToken) {
    return user || '';
  } else {
    return '';
  }
};

/**
 * validate token
 */
export const validateToken = (user) => {
  if (user?.token) {
    const splittedToken = user?.token.split('.');
    if (splittedToken.length > 1) {
      // const decodedToken = JSON.parse(atob(splittedToken[1]));
      // if (Date.now() > (decodedToken?.exp || 0) * 1000) {
      //   removeUser();
      // } else {
      return true;
      // }
    }
  }
  return false;
};

/**
 * remove user
 */
export const removeUser = () => {
  localStorage.removeItem('user');
};

/**
 * set android managment data in local storage
 */
export const setAndroidManagementLocalStorage = (androidManagement) => {
  if (androidManagement) {
    localStorage.setItem(
      'androidManagement ',
      JSON.stringify(androidManagement)
    );
  }
};

/**
 * set android management data from local storage
 */
export const getandroidManagementLocalStorage = () => {
  const androidManagement = JSON.parse(
    localStorage.getItem('androidManagement')
  );
  return androidManagement || '';
};
