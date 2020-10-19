import React, {FC} from 'react';
import {YMInitializer} from 'react-yandex-metrika';

import {ACCOUNTS, OPTIONS, VERSION} from './const';

const YaMetrika: FC = () => {
    return (
        <YMInitializer
            options={OPTIONS}
            accounts={ACCOUNTS}
            version={VERSION}
        />
    );
};

export default YaMetrika;
