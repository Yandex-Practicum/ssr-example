import {csrfLoader} from 'client/loaders/csrf';

import {Middleware, HeadersReturnType} from './types';

export type CSRFReturnType = HeadersReturnType & {
    token: string;
};

export const csrf: Middleware<void, CSRFReturnType> = async () => {
    const response = (await csrfLoader()) as string;

    return {
        name: 'csrf',
        data: {
            headers: {
                'x-csrf-token': response,
            },
            token: response,
        },
    };
};
