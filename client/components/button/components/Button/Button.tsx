import cn from 'classnames';
import React from 'react';

import {makeBem} from 'client/utils/styles';

import {Props} from './types';

import styles from './Button.scss';

const Button: Props = ({children, className, theme = 'primary', variant = 'filled', ...props}) => {
    return (
        <button
            {...props}
            className={cn(
                styles.button,
                styles[makeBem('button', theme)],
                styles[makeBem('button', theme, variant)],
                className,
            )}
        >
            {children}
        </button>
    );
};
export default Button;
