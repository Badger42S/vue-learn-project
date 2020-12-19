export default {
    async contactCoach(context, payload) {
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        };

        const response = await fetch(`https://vue-coacj-project-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
            method: 'POST',
            body:JSON.stringify(newRequest)
        });
        const responseData = await response.json();
        if(!response.ok) {
            const err = new Error(response.message || 'Faild to send request.');
            throw(err);
        }
        newRequest.id =responseData.name;
        newRequest.coachId = payload.coachId;

        context.commit('addRequest', newRequest);
    },
    async fetshRquests(context) {
        const coachId = context.rootGetters.userId;
        const response = await fetch(`https://vue-coacj-project-default-rtdb.firebaseio.com/requests/${coachId}.json`);
        const responseData = await response.json();
        if(!response.ok) {
            const err = new Error(response.message || 'Faild to fetch requests.');
            throw(err);
        }

        const requests =[];
        for (const key in responseData) {
            const request ={
                id:key,
                coachId: coachId,
                userEmail:responseData[key].userEmail,
                description: responseData[key].message
            }

            requests.push(request);
        }

        context.commit('setRequests', requests);
    }
}