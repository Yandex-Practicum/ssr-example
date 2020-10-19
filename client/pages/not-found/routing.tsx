import React from 'react';

import AppRoute from 'client/components/app-route';
import {ROUTES} from 'client/routes';

import Page from './components/page';

const {NOT_FOUND} = ROUTES;

export default [
    <AppRoute path={NOT_FOUND.INDEX} component={Page} key={NOT_FOUND.INDEX} exact/>,
];
