import {actions as metaActions} from 'client/reducers/meta';
import {actions as pageActions} from 'client/reducers/page';
import {actions as preloadActions} from 'client/reducers/preload';
import {actions as routerActions} from 'client/reducers/router';
import {actions as uiActions} from 'client/reducers/ui';
import {actions as userActions} from 'client/reducers/user';
import store from 'client/utils/infrastructure/store';

export const pure = {
    page: pageActions,
    ui: uiActions,
    router: routerActions,
    preload: preloadActions,
    user: userActions,
    meta: metaActions,
};
export const bound = store.bindActions(pure);
