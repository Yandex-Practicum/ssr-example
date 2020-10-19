import produce from 'immer';
import {ActionType, createAction, createReducer} from 'typesafe-actions';

import {SomeItems} from 'client/types/entity/some';

export interface SomeEntityReducer {
    data: SomeItems;
    otherNotStandardProps: {};
}

const defaultState: SomeEntityReducer = {
    data: [],
    otherNotStandardProps: {},
};

export const actions = {
    success: createAction('@hello/someEntityItem/SUCCESS')<SomeEntityReducer['data']>(),
};

const reducer = createReducer<SomeEntityReducer, ActionType<typeof actions>>(defaultState)
    .handleAction(
        actions.success,
        (state, action) => produce(state, draft => {
            draft.data.push(...action.payload);
            return draft;
        }),
    );

export default reducer;
