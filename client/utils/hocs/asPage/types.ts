import {RouteComponentProps} from 'react-router';
import {Dispatch} from 'redux';

export interface PreloaderParams {
    dispatch?: Dispatch<any>;
    routeProps?: RouteComponentProps<any>;
}

export interface Page {
    preloader?: (params: PreloaderParams) => Promise<any>;
    title?: string;
    name?: string;
}

export interface ComponentProps {
    title: string;
    id: string;
}
