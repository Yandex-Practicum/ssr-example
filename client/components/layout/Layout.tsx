import cn from 'classnames';
import React from 'react';

import {Props} from './types';

import styles from './Layout.scss';

const Layout: Props = ({children, className}) => {
    return (
        <div className={cn(styles.layout, className)}>
            {children}
        </div>
    );
};
export default Layout;
