import {ActionType, createAction, createReducer} from 'typesafe-actions';

export interface PageReducer {
    isReady: boolean;
}

const defaultState: PageReducer = {
    isReady: false,
};

export const actions = {
    setAsReady: createAction('page/SET_AS_READY')<void>(),
};

const reducer = createReducer<PageReducer, ActionType<typeof actions>>(defaultState)
    .handleAction(
        actions.setAsReady,
        () => ({isReady: true}),
    );

export default reducer;
