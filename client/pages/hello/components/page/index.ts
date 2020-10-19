import {compose} from 'redux';

import asPage from 'client/utils/hocs/asPage';
import storeExtension from 'client/utils/hocs/storeExtension';

import hello from '../../reducers';
import {BundleState} from '../../types';
import Page from './Page';
import {Props} from './types';

export default compose<Props>(
    asPage({
        title: Page.title,
        name: Page.id,
    }),
    storeExtension<BundleState>({hello}),
)(Page);
