import {combineReducers} from 'redux';

import {BaseEntityReducer} from 'client/utils/infrastructure/reducers/flow';

import {item as csrfItem} from './csrf';

type CSRFReducer = BaseEntityReducer<string>;

export interface UserReducers {
    csrf: CSRFReducer;
}

export const actions = {
    csrf: {
        item: csrfItem.actions,
    },
};

export default combineReducers<UserReducers>({
    csrf: combineReducers<CSRFReducer>({
        item: csrfItem.reducer,
    }),
});
