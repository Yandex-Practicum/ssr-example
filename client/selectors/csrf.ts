import {createSelector} from 'reselect';

import {CommonStore} from 'client/utils/infrastructure/store';

export const csrfSelector = createSelector(
    (state: CommonStore) => state.user.csrf.item?.data,
    data => data || '',
);
