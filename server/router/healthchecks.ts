import {Router} from 'express';

import {ping as pingHealthcheck} from 'server/controllers/healthchecks';
import {logger} from 'server/middlewares';

export const healthRoutes = (router: Router) => {
    const healthRouter: Router = Router();

    healthRouter
        .get('/ping', logger, pingHealthcheck);

    router
        .use('/healthcheck', healthRouter)
        .get('/ping', logger, pingHealthcheck);
};
