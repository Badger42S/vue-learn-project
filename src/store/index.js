import { createStore } from 'vuex';

import coachModules from './modules/coaches/index.js';
import requestsModules from './modules/request/index.js';
import authModules from './modules/auth/index.js';

const store = createStore({
    modules: {
        coaches: coachModules,
        requests:requestsModules,
        auth: authModules
    },
});

export default store;