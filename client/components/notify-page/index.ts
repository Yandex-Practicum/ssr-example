import {memo} from 'react';

import NotifyPage from './NotifyPage';
import {Props, OwnProps} from './types';

export {OwnProps as NotifyPageProps};
export default memo<Props>(NotifyPage);
