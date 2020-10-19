import {ActionType, createAction, createReducer} from 'typesafe-actions';


export interface PreloadReducer {
    isReady: boolean;
}

const defaultState: PreloadReducer = {
    isReady: false,
};

export const actions = {
    setAsStart: createAction('preload/START')<void>(),
    setAsReStart: createAction('preload/RE_START')<void>(),
    setAsErrorReady: createAction('preload/ERROR')<void>(),
    setAsReady: createAction('preload/SUCCESS')<void>(),
};

const reducer = createReducer<PreloadReducer, ActionType<typeof actions>>(defaultState)
    .handleAction(
        actions.setAsStart,
        () => ({
            isReady: false,
        }),
    )
    .handleAction(
        actions.setAsReStart,
        () => ({
            isReady: false,
        }),
    )
    .handleAction(
        actions.setAsReady,
        () => ({
            isReady: true,
        }),
    )
    .handleAction(
        actions.setAsErrorReady,
        () => ({
            isReady: true,
        }),
    );

export default reducer;
