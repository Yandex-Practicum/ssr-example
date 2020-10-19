import {ActionType, createAction, createReducer} from 'typesafe-actions';

export interface UIReducer {
    loading: boolean;
}

const defaultState: UIReducer = {
    loading: false,
};

export const actions = {
    startLoading: createAction('ui/START_LOADING')<void>(),
    stopLoading: createAction('ui/STOP_LOADING')<void>(),
};

const reducer = createReducer<UIReducer, ActionType<typeof actions>>(defaultState)
    .handleAction(
        actions.startLoading,
        () => ({loading: true}),
    )
    .handleAction(
        actions.stopLoading,
        () => ({loading: false}),
    );

export default reducer;
