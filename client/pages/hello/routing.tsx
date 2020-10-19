import React from 'react';

import AppRoute from 'client/components/app-route';
import {ROUTES} from 'client/routes';

import Page from './components/page';

const {HELLO} = ROUTES;

export default [
    <AppRoute path={HELLO.INDEX} component={Page} key={HELLO.INDEX} exact/>,
    <AppRoute
        path={HELLO.USER.INDEX}
        component={Page}
        key={HELLO.USER.INDEX}
        componentProps={{
            someCustomRouteProp: 'otherAnyData',
        }}
        exact
    />,
    <AppRoute path={HELLO.USER.ID} component={Page} key={HELLO.USER.ID} exact/>,
    <AppRoute path={HELLO.USER.OTHER_PROPS_ROUTE} component={Page} key={HELLO.USER.OTHER_PROPS_ROUTE} exact/>,
];
