import {Router} from 'express';

import {dadataProxy} from 'server/controllers/dadata';

/**
 * @swagger
 * tags:
 *   - name: dadata
 *     description: Suggests routes
 */
export const dadataRoutes = (router: Router, {basePath}: {basePath: string}) => {
    router.use(`${basePath}/suggests`, dadataProxy);
};
