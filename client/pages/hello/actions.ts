import store from 'client/utils/infrastructure/store';

import {actions} from './reducers';

export const pure = {
    ...actions,
};
export const bound = store.bindActions(pure);
