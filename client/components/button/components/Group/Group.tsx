import cn from 'classnames';
import React from 'react';

import {Props} from './types';

import styles from './Group.scss';

const Group: Props = ({children, className}) => {
    return (
        <div className={cn(styles['buttons-group'], className)}>
            {children}
        </div>
    );
};
export default Group;
