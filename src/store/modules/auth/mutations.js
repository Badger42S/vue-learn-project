/* eslint-disable no-param-reassign */
export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.tokenExperation = payload.tokenExperation;
    state.didAutoLogout = false;
  },
  logout(state) {
    state.token = null;
    state.userId = null;
    state.tokenExperation = null;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
};
