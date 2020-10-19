import {Middleware, HeadersReturnType} from './types';

export type JSONReturnType = HeadersReturnType;

export const json: Middleware<void, JSONReturnType> = ({request}) => {
    const {options: {body}} = request;

    const headers = {};
    if (!!body && typeof body === 'object') {
        headers['Content-Type'] = 'application/json';
    }

    return Promise.resolve({
        name: 'json',
        data: {
            headers,
        },
    });
};
