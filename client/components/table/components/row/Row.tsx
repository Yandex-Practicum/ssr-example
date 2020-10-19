import cns from 'classnames';
import React from 'react';

import {Props} from './types';

import styles from './Row.scss';

const Row: Props = ({onClick, children, ...rest}) => {
    const classes = cns(
        styles.wrapper,
        onClick && styles.clicker,
    );

    return (
        <tr {...rest} onClick={onClick} className={classes}>
            {children}
        </tr>
    );
};
export default Row;
