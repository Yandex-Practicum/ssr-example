export const ROUTES = {
    HELLO: {
        INDEX: '/hello',
        USER: {
            INDEX: '/hello/user',
            ID: '/hello/user/:id',
            OTHER_PROPS_ROUTE: '/hello/user/someProp/:someProp',
        },
    },
    NOT_FOUND: {
        INDEX: '*',
    },
};
