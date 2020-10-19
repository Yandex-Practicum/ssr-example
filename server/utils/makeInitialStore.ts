import cfg from 'lib/cfg';

import {AppData} from 'client/types/app';

export function makeInitialStore({appEnv}: AppData) {
    return {
        meta: {
            env: {
                item:{
                    data: appEnv,
                    status: 'success',
                    error: null,
                },
            },
            api: {
                item:{
                    data: cfg.api,
                    status: 'success',
                    error: null,
                },
            },
        },
    };
}
