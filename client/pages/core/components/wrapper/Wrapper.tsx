import React from 'react';
import {Helmet} from 'react-helmet';
import {Switch} from 'react-router';

import Layout from 'client/components/layout';
import YaMetrika from 'client/components/ya-metrika';
import config from 'client/config/config';
import Hello from 'client/pages/hello/routing';
import NotFound from 'client/pages/not-found/routing';

const metrika = process.env.NODE_ENV !== config.__DEV__ && <YaMetrika/>;

const Wrapper = () => {
    return (
        <>
            <Helmet>
                <title>Hello</title>
                <meta name="title" content="ssr"/>
            </Helmet>

            <Layout>
                <Switch>
                    {Hello}
                    {NotFound}
                </Switch>
            </Layout>

            {metrika}
        </>
    );
};
export default Wrapper;
