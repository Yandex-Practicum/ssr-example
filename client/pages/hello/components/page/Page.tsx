import React, {useMemo} from 'react';

import {bound as commonActions} from 'client/actions';
import NotifyPage, {NotifyPageProps} from 'client/components/notify-page';
import {ROUTES} from 'client/routes';

import {Props} from './types';

const notifyAction: NotifyPageProps['action'] = {
    handleClick: () => {
        commonActions.router.push(ROUTES.HELLO.USER.ID);
    },
    title: 'Ура!',
};

const Page: Props = ({
    someCustomRouteProp,
    match: {params: {id, someProp}},
}) => {
    // В зависимости от параметров можно понимать что рисовать
    // eslint-disable-next-line
    console.log(someCustomRouteProp, {params: {id, someProp}});

    const description = useMemo(() => {
        return (
            <div>
                <p>someCustomRouteProp: {someCustomRouteProp}</p>
                <p>id: {id}</p>
                <p>someProp: {someProp}</p>
            </div>
        );
    }, [someCustomRouteProp, id, someProp]);

    return (
        <NotifyPage
            title="Привет!"
            description={description}
            action={notifyAction}
        />
    );
};

Page.title = 'Hello title';
Page.id = 'hello';

export default Page;
