import {createSelector} from 'reselect';

import {BundleState} from '../types';

export const getSomeData = createSelector(
    (state: BundleState) => state.meta.api.item?.data,
    info => ({
        host: info?.host,
        timeout: info?.timeout,
    }),
);
