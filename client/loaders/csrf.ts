import {apiInstance} from 'client/api/CSRFAPI';
import {item} from 'client/reducers/user/csrf';
import {entityFind} from 'client/utils/infrastructure/reducers/entityLoader';

export const csrfLoader = entityFind(apiInstance, {
    actions: item.actions,
});
