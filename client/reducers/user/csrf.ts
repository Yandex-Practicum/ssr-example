import {generateEntityReducer} from 'client/utils/infrastructure/reducers/flow';

const PREFIX = '@user/csrf';

const {item} = generateEntityReducer<string>(PREFIX);
export {item};
