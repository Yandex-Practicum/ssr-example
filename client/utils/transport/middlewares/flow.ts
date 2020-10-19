import {CSRFReturnType} from './csrf';
import {JSONReturnType} from './json';
import {
    Middlewares,
    MiddlewareName,
    MiddlewareResponse,
    FlowOptions,
    FetchType,
} from './types';

export function flow(middlewares: Middlewares, {request}: FlowOptions) {
    const result: MiddlewareResponse<any>[] = [];
    let chain = Promise.resolve();

    middlewares.forEach(current => {
        chain = chain
            .then(() => current({request}))
            .then(data => {
                result.push(data);
            });
    });

    return chain.then(() => result);
}

type DataType =
    | CSRFReturnType
    | JSONReturnType
    | unknown;

export function handle(request: FetchType, name: MiddlewareName, data: DataType): FetchType {
    switch (name) {
        case 'json':
        case 'csrf': {
            const {headers} = data as CSRFReturnType;

            return {
                ...request,
                options: {
                    ...request.options,
                    headers: {
                        ...request.options.headers,
                        ...headers,
                    },
                },
            };
        }
        default:
            return request;
    }
}

export function handler(options: FetchType, responses: MiddlewareResponse<any>[]): FetchType {
    return responses.reduce<FetchType>((result, {name, data}) => {
        return handle(result, name, data);
    }, options);
}
