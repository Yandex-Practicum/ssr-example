import {RouteComponentProps} from 'react-router';

import {ExtendedState} from 'client/utils/infrastructure/store';

import {HelloReducers} from './reducers';

export type BundleState = ExtendedState<{
    hello: HelloReducers;
}>;

export interface RouterProps {
    id?: string;
    someProp?: string;
}

export type RouteProps = RouteComponentProps<RouterProps>;
