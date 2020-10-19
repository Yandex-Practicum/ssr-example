import {FC} from 'react';

import {AppData} from 'client/types/app';

export type OwnProps = {
    appEnv: AppData['appEnv'];
};

export type Props = FC<OwnProps>;
