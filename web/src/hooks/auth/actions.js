/**
 * Import Dependencies
 */
import { SET_AUTH } from './constants';

/**
 * Set auth
 *
 * @param {Object} data
 */
export const setAuth = (data = {}) => {
  return { type: SET_AUTH, data };
};
