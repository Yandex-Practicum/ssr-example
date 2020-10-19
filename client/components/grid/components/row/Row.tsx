import cn from 'classnames';
import React from 'react';

import {Props} from './types';

import styles from './Row.scss';

const Row: Props = ({children, className, ...rest}) => {
    return (
        <div {...rest} className={cn(styles.row, className)}>
            {children}
        </div>
    );
};
export default Row;
