export default{
    setUser(state, payload) {
        state.token =payload.token;
        state.userId = payload.userId;
        state.tokenExperation =payload.tokenExperation;
    },
    logout(state) {
        state.token =null;
        state.userId = null;
        state.tokenExperation =null;
    }
};