import prepareRoutes from './prepareRoutes';

const ROUTES: React.ReactNode[] = [];

export function extendRoutes(routes: JSX.Element[]) {
    ROUTES.splice(ROUTES.length, 0, ...prepareRoutes(routes));
}

export function getRoutes() {
    return ROUTES;
}
