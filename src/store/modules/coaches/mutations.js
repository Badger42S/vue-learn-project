export default {
    registerCoach(state, payload) {
        state.coaches.push(payload);
    },
    setCoached(state, payload) {
        state.coaches = payload;
    }
};