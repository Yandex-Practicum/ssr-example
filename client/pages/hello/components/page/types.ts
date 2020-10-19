import {FC} from 'react';

import {ComponentProps} from 'client/utils/hocs/asPage';

import {RouteProps} from '../../types';

export type OwnProps = {
    someCustomRouteProp: string;
};

export interface StateProps {
    experimentId: string;
    mouseId: string;
}

export type Props = FC<StateProps & OwnProps & RouteProps> & ComponentProps;
