/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
export default {
  async registerCoach(context, data) {
    const { userId } = context.rootGetters;
    const coachData = {
      // id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate,
    };

    const { token } = context.rootGetters;
    await fetch(`https://vue-coacj-project-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`, {
      method: 'PUT',
      body: JSON.stringify(coachData),
    });

    context.commit('registerCoach', {
      id: userId,
      ...coachData,
    });
  },
  async loadCoaches(context, payload) {
    if (!payload && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch('https://vue-coacj-project-default-rtdb.firebaseio.com/coaches.json');
    const responseData = await response.json();

    if (!response.ok) {
      const postError = new Error(responseData.message || 'Failed to fetsch');
      throw (postError);
    }

    const coaches = [];
    for (const key in responseData) {
      if (responseData.hasOwnProperty(key)) {
        const coachData = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          areas: responseData[key].areas,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
        };
        coaches.push(coachData);
      }
    }

    context.commit('setCoached', coaches);
    context.commit('setFetchTimestamp');
  },
};
