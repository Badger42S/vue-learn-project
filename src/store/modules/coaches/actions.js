export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId
        const coachData = {
            //id: context.rootGetters.userId,
            firstName: data.first,
            lastName: data.last,
            areas: data.areas,
            description: data.description,
            hourlyRate: data.rate
        };

        const response = await fetch(`https://vue-coacj-project-default-rtdb.firebaseio.com/coaches/${userId}.json`,{
            method:'PUT',
            body:JSON.stringify(coachData),
        });

        context.commit('registerCoach', {
            id: userId,
            ...coachData
        });
    }
};