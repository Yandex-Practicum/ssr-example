import {Indexed} from 'utils';

import {RTCEnv} from 'client/types/meta';

export interface AppData {
    resHeaders: Indexed;
    faviconLang: 'ru' | 'en';
    ip: string;
    nonce: string;
    appEnv: RTCEnv;
}
