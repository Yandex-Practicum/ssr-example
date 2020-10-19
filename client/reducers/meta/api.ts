import {AppConfig} from 'cfg';

import {generateEntityReducer} from 'client/utils/infrastructure/reducers/flow';

const PREFIX = '@meta/api';

const {item} = generateEntityReducer<AppConfig['api']>(PREFIX);

export {item};
