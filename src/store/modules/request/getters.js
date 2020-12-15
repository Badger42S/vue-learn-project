export default {
    reuests(state) {
        return state.requests;
    },
    hasRequest(state) {
        return state.requests.length>0 && state.requests;
    }
}