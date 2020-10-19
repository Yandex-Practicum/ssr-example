import {Indexed} from 'utils';

export type MiddlewareName =
    | 'csrf'
    | 'json';
export interface MiddlewareOption {
    name: MiddlewareName;
}

export type MiddlewareRequest<T> = {
    props?: T;
    request: FetchType;
};

export type MiddlewareResponse<T> = MiddlewareOption & {
    data: T;
};

export type Middleware<T, Res> = (options: MiddlewareRequest<T>) => Promise<MiddlewareResponse<Res>>;
export type Middlewares<T = void, Res extends Indexed = {}> = Middleware<T, Res>[];

export interface FetchType {
    url: string;
    options: RequestInit;
}

export interface FlowOptions {
    request: FetchType;
}

export interface HeadersReturnType {
    headers: Indexed<string>;
}
