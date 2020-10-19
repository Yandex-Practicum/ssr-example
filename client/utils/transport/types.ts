import {Indexed} from 'utils';

export {Middlewares, Middleware} from './middlewares/types';

export interface FetchOptions {
    method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT' | 'HEAD' | 'OPTIONS' | 'CONNECT';
    headers?: Headers | Indexed<string>;
    body?: string | FormData | Indexed;
    mode?: 'cors' | 'no-cors' | 'same-origin';
    credentials?: 'omit' | 'same-origin' | 'include';
    cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached';
    redirect?: 'follow' | 'error' | 'manual';
    referrer?: string;
    referrerPolicy?: 'referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'unsafe-url';
}
