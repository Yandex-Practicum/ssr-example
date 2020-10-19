import {ConnectedRouter} from 'connected-react-router';
import React, {PureComponent} from 'react';
import {hydrate} from 'react-dom';
import {Helmet} from 'react-helmet';
import {hot} from 'react-hot-loader/root';
import {Provider} from 'react-redux';

import Core from 'client/pages/core';
import {AppData} from 'client/types/app';
import store, {history} from 'client/utils/infrastructure/store';

import {Props} from './types';

class Bundle extends PureComponent<Props> {
    public render() {
        const {data} = this.props;

        return (
            <>
                <Helmet>
                    <html lang="en"/>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
                    />
                </Helmet>

                <Core appEnv={data.appEnv}/>
            </>
        );
    }
}

export const DesktopBundle = hot(Bundle);

export default (data: AppData) => {
    hydrate(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <DesktopBundle data={data}/>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root'),
    );
};
