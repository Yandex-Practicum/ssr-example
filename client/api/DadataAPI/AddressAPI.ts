import {EntityAPI} from 'utils';

import {RequestOptions, Response} from 'client/types/dadata';
import {suggestsApi} from 'client/utils/transport';

class AddressAPI implements EntityAPI {
    public request = (options: RequestOptions) => {
        return suggestsApi.post<RequestOptions, Response>('/address', options)
            .then(({suggestions}) => suggestions);
    };
}

export const apiInstance = new AddressAPI();
