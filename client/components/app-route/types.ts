import {ReactNode} from 'react';
import {RouteProps} from 'react-router';
import {Indexed} from 'utils';

export type Props = RouteProps & {
    componentProps?: Indexed;
    component: ReactNode;
};
