import {Router} from 'express';

import {appRoutes} from './app';
import {dadataRoutes} from './dadata';
import {healthRoutes} from './healthchecks';
import {staticRoutes} from './static';

const router: Router = Router();

const BASE_API_PATH = '/api';

appRoutes(router);
staticRoutes(router);
healthRoutes(router);
dadataRoutes(router, {basePath: BASE_API_PATH});

export default router;
