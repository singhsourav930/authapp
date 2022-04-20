import React, { createContext, useReducer } from 'react';
import { oneOfType, array, object } from 'prop-types';
import authReducer from './auth/reducer';
import initialAuthState from './auth/state';

const Store = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, initialAuthState);

  const data = {
    authState,
    dispatchAuth,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

Store.propTypes = {
  children: oneOfType([array, object]),
};

export const Context = createContext();

export default Store;
