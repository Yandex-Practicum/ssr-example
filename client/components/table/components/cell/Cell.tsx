import cn from 'classnames';
import React, {useMemo} from 'react';

import {Props} from './types';

import styles from './Cell.scss';

const Cell: Props = ({className, type = 'common', children, ...rest}) => {
    const content = useMemo(() => {
        const classNames = cn(
            styles[type],
            className,
        );

        switch (type) {
            case 'head': {
                return (
                    <th className={classNames} {...rest}>
                        {children}
                    </th>
                );
            }
            case 'common':
            default: {
                return (
                    <td className={classNames} {...rest}>
                        {children}
                    </td>
                );
            }
        }
    }, [type, className, rest, children]);

    return content;
};
export default Cell;
