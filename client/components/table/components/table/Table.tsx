import React from 'react';

import Spinner from 'client/components/spinner';

import {Props} from './types';

import styles from './Table.scss';

const Table: Props = ({children, isPending}) => {
    return (
        <div className={styles.tableWrapper}>
            {isPending && (
                <div className={styles.pendingWrapper}>
                    <Spinner/>
                </div>
            )}

            <table className={styles.table}>
                {children}
            </table>
        </div>
    );
};

Table.defaultProps = {
    isPending: false,
};
export default Table;
