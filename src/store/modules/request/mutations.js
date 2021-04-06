/* eslint-disable no-param-reassign */
export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  setRequests(state, payload) {
    state.requests = payload;
  },
};
