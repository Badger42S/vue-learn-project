let timer;

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

        const expirIn = + respData.expiresIn *1000;
        const experationDate = new Date().getTime() + expirIn;

        localStorage.setItem('token', respData.idToken);
        localStorage.setItem('userId', respData.localId);
        localStorage.setItem('tokenExperation', experationDate);

        timer = setTimeout(function() {
            context.dispatch('autoLogout')
        }, expirIn);

        context.commit('setUser', {
            token: respData.idToken,
            userId: respData.localId,
            tokenExperation: experationDate
        });
    },
    autoLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExperation = localStorage.getItem('tokenExperation');

        const exoiresIn = +tokenExperation - new Date().getTime();
        if(exoiresIn<10000) {
            return;
        }

        timer = setTimeout(function() {
            context.dispatch('autoLogout')
        }, exoiresIn);

        if(token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
                tokenExperation:null
            });
        }
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExperation');

        clearTimeout(timer);

        context.commit('logout');
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    }
};