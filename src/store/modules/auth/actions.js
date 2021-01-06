export default{
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        });
    },
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        });
    },
    async auth(context, payload) {
        const mode = payload.mode;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKdynHm9uaj7zGr2fx9w2suU77WET9a0Y';
        if(mode === 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKdynHm9uaj7zGr2fx9w2suU77WET9a0Y'
        }

        const response = await fetch(url, 
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
            const err = new Error(respData || 'Faild to authenticate');
            throw err;
        }

        localStorage.setItem('token', respData.idToken);
        localStorage.setItem('userId', respData.localId);

        context.commit('setUser', {
            token: respData.idToken,
            userId: respData.localId,
            tokenExperation: respData.expiresIn
        });
    },
    autoLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if(token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
                tokenExperation:null
            });
        }
    },
    logout(context) {
        context.commit('logout');
    }
};