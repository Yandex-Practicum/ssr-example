import fetch from 'isomorphic-fetch';
import {stringify} from 'query-string';
import {Indexed, Nullable} from 'utils';

import {apiDataSelector} from 'client/selectors/meta';
import {getStore} from 'client/utils/infrastructure/store';

import {flow, middlewaresHandler, FetchType} from './middlewares';
import {promiseTimeout} from './timeout';
import {Middlewares} from './types';

const apiCfg = apiDataSelector(getStore());

export default class HTTPTransport {
    public uri: string;
    public middlewares: Middlewares;

    private host = apiCfg.host;
    private timeout = apiCfg.timeout as number;
    private _nodeCookie: Nullable<string>;

    constructor(uri: string, middlewares: Middlewares = []) {
        this.uri = uri;
        this._nodeCookie = null;
        this.middlewares = middlewares;
    }

    public response<Result>(
        url: string,
        method: RequestInit['method'],
        body?: Indexed | void,
        headers?: Headers,
    ): Promise<Result> {
        if (!headers) {
            headers = new Headers();
        }

        if (this._nodeCookie) {
            headers.set('Cookie', this._nodeCookie);
        }
        headers.set('content-type', 'application/json');

        const requestData: FetchType = {
            url: `${this.host}${this.uri}${encodeURI(url)}`,
            options: {
                method,
                headers,
                body,
                credentials: 'include',
                mode: 'cors',
            } as RequestInit,
        };

        return flow(this.middlewares, {request: requestData})
            .then(result => {
                const {url: resultUrl, options} = middlewaresHandler(requestData, result);

                return promiseTimeout<Response>(
                    this.timeout,
                    fetch(
                        resultUrl,
                        {
                            ...options,
                            body: options.body ? JSON.stringify(options.body) : undefined,
                        },
                    ),
                );
            })
            .then(response => {
                const contentType = response.headers.get('Content-Type');

                if (contentType?.includes('text')) {
                    return response.text();
                }

                return response.json();
            })
            .then(data => data as Result)
            .catch(error => error as Result);
    }

    public set nodeCookie(cookie) {
        this._nodeCookie = cookie;
    }

    public get<Query = object, Result = Response>(url: string, body?: Query, headers?: Headers): Promise<Result> {
        const params = stringify(body || {}, {encode: false});

        return this.response<Result>(
            `${url}${params ? ((url.endsWith('?') ? '' : '?') + params) : ''}`,
            'GET',
            undefined,
            headers,
        );
    }

    public post<Data extends Indexed | void, Result = Response>(
        url: string,
        body?: Data,
        headers?: Headers,
    ): Promise<Result> {
        return this.sendWithData<Data, Result>('POST', url, body, headers);
    }

    public put<Data extends Indexed, Result = Response>(
        url: string,
        body?: Data,
        headers?: Headers,
    ): Promise<Result> {
        return this.sendWithData<Data, Result>('PUT', url, body, headers);
    }

    public delete<Data extends Indexed, Result = Response>(
        url: string,
        body?: Data,
        headers?: Headers,
    ): Promise<Result> {
        return this.sendWithData<Data, Result>('DELETE', url, body, headers);
    }

    protected sendWithData<Data extends Indexed | void, Result>(
        method: RequestInit['method'],
        url: string,
        body?: Data,
        headers?: Headers,
    ): Promise<Result> {
        if (!headers) {
            headers = new Headers();
        }
        headers.set('Content-Type', 'application/json');

        return this.response<Result>(url, method, body, headers);
    }
}
