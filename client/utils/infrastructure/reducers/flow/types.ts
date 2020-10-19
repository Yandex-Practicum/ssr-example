import {PayloadActionCreator} from 'typesafe-actions';
import {Nullable} from 'utils';

export enum Status {
    Success = 'success',
    Pending = 'pending',
    Failed = 'failed',
}

export interface BaseActions<D> {
    success: PayloadActionCreator<string, D>;
    pending: PayloadActionCreator<string, void>;
    failed: PayloadActionCreator<string, string>;
    reset: PayloadActionCreator<string, void>;
}

export interface BaseState<D> {
    data: Nullable<D>;
    error: Nullable<string>;
    status: Nullable<Status>;
}

export interface EntityReducerOptions<D> {
    withItem?: boolean;
    defaultState?: {
        item?: Partial<BaseState<D>>;
        items?: Partial<BaseState<D[]>>;
    };
}

export type BaseEntityReducer<D> =
    | {
        items: BaseState<D[]>;
        item?: BaseState<D>;
    }
    | {
        items?: BaseState<D[]>;
        item: BaseState<D>;
    };

export interface ItemEntityReducer<D> {
    item: BaseState<D>;
}
