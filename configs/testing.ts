import {AppConfig} from 'cfg';

import testingCsp from './csp/testing';

const config: AppConfig = {
    csp: {
        presets: testingCsp,
    },

    static: {
        baseUrl: `//s3.mds.yandex.net/taxi-hiring-pa/hiring-partners-app/${process.env.APP_VERSION}/client/`,
        frozenPath: '/_',
        version: '',
    },
};

module.exports = config;
