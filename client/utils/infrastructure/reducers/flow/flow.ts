import produce, {Draft} from 'immer';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import merge from 'lodash/merge';
import {createSelector} from 'reselect';
import {ActionType, createAction, createReducer} from 'typesafe-actions';

import {CommonStore} from 'client/utils/infrastructure/store';

import {baseDefaultState} from './consts';
import {BaseActions, BaseState, EntityReducerOptions, Status} from './types';
import {checkPending} from './utils';

export function generateBaseActions<D>(prefix: string): BaseActions<D> {
    return {
        success: createAction(`${prefix}/SUCCESS`)<D>() as BaseActions<D>['success'],
        pending: createAction(`${prefix}/PENDING`)<void>(),
        failed: createAction(`${prefix}/FAILED`)<string>(),
        reset: createAction(`${prefix}/RESET`)<void>(),
    };
}

export function generateBaseReducer<D>(prefix: string, defaultState: Partial<BaseState<D>>) {
    // TODO: fix types
    const actions: any = generateBaseActions<D>(prefix);
    const defaultValue = merge(baseDefaultState, cloneDeep(defaultState));

    const reducer = createReducer<BaseState<D>, ActionType<typeof actions>>(baseDefaultState)
        .handleAction(
            actions.success,
            (state, {payload}) => produce(state, draft => {
                draft.data = payload as Draft<BaseState<D>['data']>;
                draft.status = Status.Success;

                return draft as BaseState<D>;
            }),
        )
        .handleAction(
            // @ts-ignore
            actions.failed,
            (state, {payload}) => produce(state, draft => {
                draft.error = payload;
                draft.status = Status.Failed;

                return draft as BaseState<D>;
            }),
        )
        .handleAction(
            actions.pending,
            state => produce(state, draft => {
                draft.status = Status.Pending;

                return draft;
            }),
        )
        .handleAction(
            actions.reset,
            () => defaultValue,
        );

    return {
        actions,
        reducer,
    };
}

export function generateEntityReducer<D>(prefix: string, options?: EntityReducerOptions<D>) {
    const {withItem = true, defaultState} = options || {};

    return {
        items: generateBaseReducer<D[]>(`${prefix}/items`, (defaultState?.items || {})),
        ...(withItem ? {item: generateBaseReducer<D>(`${prefix}/item`, (defaultState?.item || {}))} : {}),
    };
}

export function generateSelectorGroup<T extends CommonStore, D>(path: string) {
    const dataPath = `${path}.data`;
    const statusPath = `${path}.status`;
    const errorPath = `${path}.error`;

    return {
        listSelector: createSelector(
            (state: T) => get(state, dataPath),
            (item: D[]) => item || [],
        ),
        itemSelector: createSelector(
            (state: T) => get(state, dataPath),
            (item: D) => item,
        ),
        statusSelector: createSelector(
            (state: T) => get(state, statusPath),
            (status: Status) => status,
        ),
        checkPendingSelector: createSelector(
            (state: T) => get(state, statusPath),
            checkPending,
        ),
        errorSelector: createSelector(
            (state: T) => get(state, errorPath),
            (error: string) => error,
        ),
    };
}

/*
    * path – Путь от state до reducer
 */
export function generateSelectors<T extends CommonStore, D>(path: string) {
    const itemsPath = `${path}.items`;
    const itemPath = `${path}.item`;

    return {
        items: generateSelectorGroup<T, D[]>(itemsPath),
        item: generateSelectorGroup<T, D>(itemPath),
    };
}
