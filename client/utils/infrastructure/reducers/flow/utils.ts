import {Nil} from 'utils';

import {Status} from './types';

export function checkPending(status: Nil<Status>) {
    return status === Status.Pending;
}
