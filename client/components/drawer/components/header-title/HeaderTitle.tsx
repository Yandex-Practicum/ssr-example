import React from 'react';

import {Props} from './types';

import styles from './HeaderTitle.scss';

const HeaderTitle: Props = ({children}) => {
    return (
        <h2 className={styles.title}>{children}</h2>
    );
};
export default HeaderTitle;
