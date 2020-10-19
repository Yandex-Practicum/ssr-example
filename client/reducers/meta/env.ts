import {RTCEnv} from 'client/types/meta';
import {generateEntityReducer} from 'client/utils/infrastructure/reducers/flow';

const PREFIX = '@meta/env';

const {item} = generateEntityReducer<RTCEnv>(PREFIX);
export {item};
