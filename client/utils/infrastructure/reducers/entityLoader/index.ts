import {EntityAPI, Empty} from 'utils';

import store, {CommonStore, getStore} from 'client/utils/infrastructure/store';

import {EntityLoaderConfig, PaginationOptions} from './types';

export function entityOperation<D, R = unknown>(
    request: Empty<(...args: any[]) => Promise<any>>,
    config: EntityLoaderConfig<D>,
) {
    if (!request) {
        throw new TypeError('API должен содержать метод request или find.');
    }

    const {mapOptions, actions, mapPagination} = config;

    const {dispatch} = store;
    const state = getStore<CommonStore>();
    const initArgs: any = null;

    const initAction = actions.pending;
    const successAction = actions.success;
    const errorAction = actions.failed;

    const paginationData: PaginationOptions = {
        start: 0,
        limit: 30,
        continue: true,
    };

    return async function (params: R = {} as any): Promise<D | string> {
        if (initAction) {
            dispatch(initAction());
        }

        try {
            const result = await request({
                ...(mapPagination ? mapPagination(paginationData) : {}),
                ...(mapOptions ? mapOptions(state, initArgs) : {}),
                ...params,
            });

            if (successAction) {
                if (mapPagination) {
                    paginationData.start += result.data.length;

                    dispatch(successAction(result));

                } else {
                    dispatch(successAction(result));
                }
            }

            return result;
        } catch (error) {
            if (errorAction) {
                dispatch(errorAction(error));
            }

            throw error;
        }
    };
}

export function entityLoader<D, R = unknown>(
    entityApiInstance: EntityAPI,
    config: EntityLoaderConfig<D>,
) {
    return entityOperation<D, R>(entityApiInstance?.request, config);
}

export function entityFind<D, R = unknown>(
    entityApiInstance: EntityAPI,
    config: EntityLoaderConfig<D>,
) {
    return entityOperation<D, R>(entityApiInstance?.find, config);
}

export {PaginationOptions};
