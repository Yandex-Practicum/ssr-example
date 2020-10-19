import cn from 'classnames';
import React from 'react';

import {Props} from './types';

import styles from './Col.scss';

const Col: Props = ({className, children, ...other}) => {
    return (
        <div {...other} className={cn(styles.col, className)}>
            {children}
        </div>
    );
};
export default Col;
