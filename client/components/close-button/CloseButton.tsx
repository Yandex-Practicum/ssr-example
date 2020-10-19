import React from 'react';

import {Props} from './types';

import styles from './CloseButton.scss';

const Wrapper: Props = ({onClick}) => {

    return (
        <div className={styles.close} onClick={onClick}/>
    );
};
export default Wrapper;
