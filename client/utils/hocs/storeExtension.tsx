import React, {ComponentType} from 'react';
import {Reducer} from 'redux';
import {Assign, Indexed} from 'utils';

import {CommonStore} from 'client/utils/infrastructure/store';
import store, {ExtendedState} from 'client/utils/infrastructure/store';

// позволяет проверить, что переданный extention соответствует заявленному в BundleState
type ExtractExtention<TBundleState> = TBundleState extends Assign<CommonStore, infer E>
    ? {[K in keyof E]: Reducer<E[K]>}
    : never;

export default function storeExtension<E extends ExtendedState<any> = any>(extention: Partial<ExtractExtention<E>>) {
    return <P extends Indexed>(Component: ComponentType<P>) => {
        class StoreExtension extends React.PureComponent<P> {
            public static displayName = `StoreExtention(${Component.displayName})`;

            constructor(props: P) {
                super(props);

                const componentStore = Object.keys(extention)[0];
                if (!store.getState().hasOwnProperty(componentStore)) {
                    store.recombineStoreWith(extention as any);
                }

            }

            public render() {
                return (
                    <Component {...this.props}/>
                );
            }
        }

        return StoreExtension;
    };
}
