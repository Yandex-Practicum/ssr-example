declare module 'page' {
    import {RouteComponentProps} from 'react-router';
    import {Dispatch} from 'redux';

    export interface PreloaderParams {
        dispatch?: Dispatch<any>;
        state?: any;
        routeProps?: RouteComponentProps<any>;
    }

    export interface Page {
        preloader?: (params: PreloaderParams) => Promise<any>;
        title?: string;
        name?: string;
    }

    export interface Settings {
        title: string;
        key: string;
    }

    export interface Preload<E> {
        // TODO: switch to mapOptions
        isReload?: boolean;
        withSpinner?: boolean;
        onLoad: (...args: E[]) => unknown;
        onDispose?: (...args: unknown[]) => unknown;
    }
}
