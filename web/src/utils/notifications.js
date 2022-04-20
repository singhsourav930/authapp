import { MESSAGES } from 'constants/messages';

/**
 * Show Success Notification
 *
 * @param {String} message [message to show]
 */
export const showSuccessMsg = (msg) => {
  showNotification(msg, 'success');
};

/**
 * Show Error Notification
 *
 * @param {String} message [message to show]
 */
export const showErrorMsg = (msg) => {
  showNotification(msg, 'error');
};

/**
 * Show Warning Notification
 *
 * @param {String} message [message to show]
 */
export const showWarnMsg = (msg) => {
  showNotification(msg, 'warning');
};

/**
 * Show Info Notification
 *
 * @param {String} message [message to show]
 */
export const showInfoMsg = (msg) => {
  showNotification(msg, 'info');
};

/**
 * Format amd Show Notification
 *
 * @param {String} msg
 * @param {String} variant ['success', 'warning', 'info', 'error']
 *
 * @return {Object} snack
 */
const showNotification = (msg, variant) => {
  const snackData = {
    message: msg ? String(msg) : MESSAGES.INTERNAL_ERROR,
    variant,
  };

  const e = new CustomEvent('setReactTostify', { detail: snackData });
  document.dispatchEvent(e);
};
