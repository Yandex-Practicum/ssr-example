import {combineReducers} from 'redux';

import someEntityItem, {actions as someEntityItemActions, SomeEntityReducer} from './someEntityItem';

export interface HelloReducers {
    someEntityItem: SomeEntityReducer;
}

export const actions = {
    someEntityItem: someEntityItemActions,
};

export default combineReducers<HelloReducers>({
    someEntityItem,
});
