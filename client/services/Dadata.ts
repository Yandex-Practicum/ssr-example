import {uniqBy} from 'lodash';

import {apiInstance as addressApiInstance} from 'client/api/DadataAPI/AddressAPI';
import {apiInstance as countryApiInstance} from 'client/api/DadataAPI/CountryAPI';
import {RequestOptions, DataMapper} from 'client/types/dadata';

class Dadata {
    public request = async (
        suggestType: {}, // TODO: Добавить тип
        options: RequestOptions,
        mapper?: DataMapper,
    ) => {
        const requester = suggestType === 'address'
            ? addressApiInstance.request
            : countryApiInstance.request;
        const response = await requester(options);

        const suggests = mapper
            ? mapper(response || [])
            : (response || []).map(({value}) => ({value, label: value}));

        return uniqBy(suggests, 'label')
            .filter(({value}) => Boolean(value));
    };
}

export const dadataService = new Dadata();
