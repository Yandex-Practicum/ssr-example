import React from 'react';

import isServer from 'client/utils/serverSide/isServerEnvCheker';

export function renderOnClientSideOnly(
    Component: React.ComponentType,
    props: any,
) {
    if (isServer) {
        return (
            <React.Fragment/>
        );
    }

    return <Component {...props}/>;
}
