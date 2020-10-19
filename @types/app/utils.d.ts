declare module 'utils' {
    import {Location} from 'history';
    import {RouteComponentProps} from 'react-router';

    export interface Indexed<T = any> {
        [x: string]: T;
    }

    export type Assign<T, K> = Pick<T, Exclude<keyof T, keyof K>> & K;

    export interface RouterLocation extends Location {
        query?: Indexed;
    }

    export abstract class EntityAPI {
        abstract request?: (...args: any[]) => Promise<any>;
        abstract create?: (...args: any[]) => Promise<any>;
        abstract update?: (...args: any[]) => Promise<any>;
        abstract delete?: (...args: any[]) => Promise<any>;
        abstract find?: (...args: any[]) => Promise<any>;
    }

    export type RouteProps<T> = Assign<RouteComponentProps<T>, {
        location: RouterLocation;
    }>;

    export type Nullable<T = unknown> = null | T;
    export type Empty<T = unknown> = undefined | T;
    export type Nil<T = unknown> = Empty<T> | Nullable<T>;

    export interface FindRequest {
        id: string;
    }
}
