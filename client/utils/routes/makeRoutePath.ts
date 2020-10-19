import config from 'client/config/config';

const {BASE_PATH} = config;

export default (path: string) => `${BASE_PATH}${path}`;
