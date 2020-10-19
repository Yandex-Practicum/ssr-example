import cn from 'classnames';
import React from 'react';

import {Props} from './types';

import styles from './Spinner.scss';

const Spinner: Props = ({className}) => {
    return (
        <svg className={cn(styles.spinner, className)} viewBox="0 0 50 50">
            <circle
                className={styles.path}
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="5"
            />
        </svg>
    );
};
export default Spinner;
