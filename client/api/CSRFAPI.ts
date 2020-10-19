import {EntityAPI} from 'utils';

import {CSRF} from 'client/types/csrf';
import {baseApi} from 'client/utils/transport';

class CSRFAPI implements EntityAPI {
    public request = () => {
        return baseApi.get<void, CSRF>('/csrf_token')
            .then(({token}) => token);
    };
}

export const apiInstance = new CSRFAPI();
