import {createSelector} from 'reselect';

import {CommonStore} from 'client/utils/infrastructure/store';

export const apiDataSelector = createSelector(
    (state: CommonStore) => state.meta.api.item?.data,
    info => ({
        host: info?.host,
        timeout: info?.timeout,
    }),
);

export const envSelector = createSelector(
    (state: CommonStore) => state.meta.env.item?.data,
    status => status,
);
