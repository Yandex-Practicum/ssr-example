import {AppConfig} from 'cfg';
import {combineReducers} from 'redux';

import {RTCEnv} from 'client/types/meta';
import {BaseEntityReducer} from 'client/utils/infrastructure/reducers/flow';

import {item as apiItem} from './api';
import {item as envItem} from './env';

type EnvReducer = BaseEntityReducer<RTCEnv>;
type ApiReducer = BaseEntityReducer<AppConfig['api']>;

export interface MetaReducers {
    env: EnvReducer;
    api: ApiReducer;
}

export const actions = {
    env: {
        item: envItem.actions,
    },
    api: {
        item: apiItem.actions,
    },
};

export default combineReducers<MetaReducers>({
    env: combineReducers<EnvReducer>({
        item: envItem.reducer,
    }),
    api: combineReducers<ApiReducer>({
        item: apiItem.reducer,
    }),
});
