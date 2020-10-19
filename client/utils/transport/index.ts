import {csrf, json} from './middlewares';
import HTTPTransport from './transport';

export const baseApi = new HTTPTransport('');
export const api = new HTTPTransport('/api', [json, csrf]);
export const suggestsApi = new HTTPTransport('/api/suggests');

export {
    HTTPTransport,
};
