import {AppConfig} from 'cfg';

import unstableCsp from './csp/unstable';

const config: AppConfig = {
    csp: {
        presets: unstableCsp,
    },
    static: {
        baseUrl: `//storage.yandexcloud.net/path/to/S3/${process.env.APP_VERSION}/client/`,
        frozenPath: '/_',
        version: '',
    },
};

module.exports = config;
