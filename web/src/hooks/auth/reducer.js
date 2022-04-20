import { SET_AUTH } from './constants';

/**
 * Define the reducer with actions
 *
 * @param {Object} state
 * @param {Object} action
 */
const authReducer = (state, action) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, auth: action.data };

    default:
      return state;
  }
};

export default authReducer;
