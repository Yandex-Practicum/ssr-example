import {RouterState} from 'connected-react-router';

import meta, {MetaReducers} from './meta';
import page, {PageReducer} from './page';
import preload, {PreloadReducer} from './preload';
import router from './router';
import ui, {UIReducer} from './ui';
import user, {UserReducers} from './user';

export interface BaseStore {
    router: RouterState;
    ui: UIReducer;
    page: PageReducer;
    preload: PreloadReducer;
    user: UserReducers;
    meta: MetaReducers;
}

export const reducers = {
    router,
    ui,
    page,
    preload,
    user,
    meta,
};
