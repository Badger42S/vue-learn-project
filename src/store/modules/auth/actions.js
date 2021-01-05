export default{
    async login(context, payload) {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKdynHm9uaj7zGr2fx9w2suU77WET9a0Y', 
            {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
        });
        const respData = await response.json();

        if(!response.ok) {
            console.log(respData);
            const err = new Error(respData || 'Faild to authenticate');
            throw err;
        }

        context.commit('setUser', {
            token: respData.idToken,
            userId: respData.localId,
            tokenExperation: respData.expiresIn
        });
    },
    async signup(context, payload) {
       const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKdynHm9uaj7zGr2fx9w2suU77WET9a0Y', 
            {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
        });
        const respData = await response.json();

        if(!response.ok) {
            console.log(respData);
            const err = new Error(respData || 'Faild to authenticate');
            throw err;
        }

        context.commit('setUser', {
            token: respData.idToken,
            userId: respData.localId,
            tokenExperation: respData.expiresIn
        });
    }
};