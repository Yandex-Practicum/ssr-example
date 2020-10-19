import devHosts from 'configs/hosts.json';
import {Express} from 'express';
import {readFileSync} from 'fs';
import https from 'https';
import {homedir} from 'os';
import {resolve} from 'path';
import Loadable from 'react-loadable';


import {makeStartLogsText} from 'server/utils/startLogs';

interface Options {
    server: Express;
}

const {PORT = 3000} = process.env;

const pem = readFileSync(resolve(`${homedir()}/.certs`, 'dev.pem'), 'utf8');

const APP_HOSTS: string[] = [
    ...devHosts.map(({host}) => host),
    'localhost',
];

export function startApp({server}: Options) {
    Loadable.preloadAll().then(() => {
        if (process.env.__DEV__ && pem) {
            https
                .createServer({key: pem, cert: pem}, server)
                .listen(PORT, () => {
                    // eslint-disable-next-line
                    console.log(makeStartLogsText(APP_HOSTS, 'https', PORT));
                });
            return;
        }

        server.listen(PORT, () => {
            // eslint-disable-next-line
            console.log(makeStartLogsText(APP_HOSTS, 'http', PORT));
        });
    });
}
