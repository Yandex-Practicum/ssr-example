import htmlescape from 'htmlescape';
import cfg from 'lib/cfg';
import React from 'react';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import {Helmet, HelmetData} from 'react-helmet';
import {Provider} from 'react-redux';
import {StaticRouterContext} from 'react-router';
import {StaticRouter} from 'react-router-dom';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';

import vendorsMeta from 'webpack/config/vendors-meta';

import {reducers} from 'client/reducers';
import configureStore from 'client/store';
import {AppData} from 'client/types/app';
import {reduxStore} from 'client/utils/infrastructure/store';

import {makeInitialStore} from 'server/utils/makeInitialStore';
import {renderObject} from 'server/utils/renderObject';

function getBundle(bundleName: string, lang: string) {
    const module = `../../../ssr.bundles.${lang}`;

    if (cfg.render && cfg.render.isHot) {
        delete require.cache[require.resolve(module)];
    }

    return require(module).bundles[bundleName]; // eslint-disable-line global-require
}

interface PageHtmlParams {
    helmet: HelmetData;
    bundleName: string;
    bundleHtml: string;
    data: AppData;
    store: typeof reduxStore;
    styled: string;
}

function getPageHtml(params: PageHtmlParams) {
    const {helmet, bundleName, bundleHtml, data, store, styled} = params;
    const {baseUrl} = cfg.static;
    const bundleFilePath = `${baseUrl}${bundleName}.bundle`;
    const vendorsFilePath = `${baseUrl}_/${vendorsMeta.name}`;

    const html = renderToStaticMarkup(
        <html>
            <head>
                {helmet.title.toComponent()}
                {helmet.meta.toComponent()}
                {helmet.link.toComponent()}
                {helmet.script.toComponent()}

                <style
                    data-styled="true"
                    nonce={data.nonce}
                    dangerouslySetInnerHTML={{__html: styled}}
                />

                <link rel="icon" type="image/png" href="/favicons/favicon.png"/>
                <link rel="stylesheet" href={`${bundleFilePath}.css`}/>
                {vendorsMeta.hasCss && <link rel="stylesheet" href={`${vendorsFilePath}.css`}/>}
            </head>
            <body>
                <div id="root" dangerouslySetInnerHTML={{__html: bundleHtml}}/>
                <script
                    nonce={data.nonce}
                    dangerouslySetInnerHTML={{
                        __html: `window.__PRELOADED_STATE__ = ${renderObject(store.getState())}`,
                    }}
                />
                {vendorsMeta.hasJs && <script nonce={data.nonce} src={`${vendorsFilePath}.js`}/>}
                <script nonce={data.nonce} src={`${bundleFilePath}.ru.js`}/>
                <script
                    nonce={data.nonce}
                    dangerouslySetInnerHTML={{
                        __html: `Client.default(${htmlescape(data)});`,
                    }}
                />
            </body>
        </html>,
    );

    return `<!doctype html>${html}`;
}

interface RenderBundleArguments {
    bundleName: string;
    data: AppData;
    location: string;
}

/* eslint-disable-next-line max-statements, complexity */
export default ({bundleName, data, location}: RenderBundleArguments) => {
    const context: StaticRouterContext = {};
    const Bundle = getBundle(bundleName, 'ru');

    if (!Bundle) {
        throw new Error(`Bundle ${bundleName} not found`);
    }

    const {store} = configureStore(
        reducers,
        makeInitialStore(data),
        {isLogger: false, router: {initialEntries: [location]}},
    );
    const sheet = new ServerStyleSheet();

    const bundleHtml = renderToString(
        (
            <StyleSheetManager sheet={sheet.instance}>
                <Provider store={store}>
                    <StaticRouter context={context} location={location}>
                        <Bundle data={data} state={store}/>
                    </StaticRouter>
                </Provider>
            </StyleSheetManager>
        ),
    );

    if (context.url) {
        return {redirectUrl: context.url};
    }

    const helmet = Helmet.rewind();
    const styledTags = sheet.getStyleTags();

    return {
        html: getPageHtml({
            helmet,
            bundleName,
            bundleHtml,
            data,
            store,
            styled: styledTags,
        }),
    };
};
