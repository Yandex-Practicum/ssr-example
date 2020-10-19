import React from 'react';

import Button from 'client/components/button';

import {Props} from './types';

import styles from './NotifyPage.scss';

const NotifyPage: Props = ({title, description, action}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <h2 className={styles.header}>{title}</h2>
                {description && <p className={styles.suggest}>{description}</p>}

                {action && (
                    <Button onClick={action.handleClick}>
                        {action.title}
                    </Button>
                )}
            </div>
        </div>
    );
};
export default NotifyPage;
