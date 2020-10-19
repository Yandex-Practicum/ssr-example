import React, {FC} from 'react';

import styles from './Card.scss';

const Card: FC = ({children}) => {
    return (
        <div className={styles.root}>
            {children}
        </div>
    );
};

export default Card;
