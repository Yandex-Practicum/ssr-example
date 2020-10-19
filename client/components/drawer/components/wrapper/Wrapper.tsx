import cns from 'classnames';
import React, {useMemo, CSSProperties, useCallback} from 'react';

import {bound as commonActions} from 'client/actions';
import arrowLeft from 'client/assets/images/arrow-left.png';
import CloseButton from 'client/components/close-button';
import Spinner from 'client/components/spinner';

import {Props} from './types';

import styles from './Wrapper.scss';

const Wrapper: Props = ({
    title,
    handleClose,
    visible = true,
    width,
    children,
    back,
    isPending = false,
}) => {
    const style: CSSProperties = useMemo(() => ({
        width,
    }), [width]);

    const pendingStyle: CSSProperties = useMemo(() => ({
        width,
    }), [width]);

    const wrapperClasses = cns(
        styles.wrapper,
        visible && styles.wrapper_display,
    );
    const backgroundClasses = cns(
        styles.background,
        visible && styles.background_display,
    );

    const closeHandler = useCallback(() => {
        handleClose?.();
    }, [handleClose]);

    const titleClasses = cns(
        styles.header__title,
        styles.header__title_text,
    );

    const backHandler = useCallback(() => {
        if (back?.to) {
            commonActions.router.push(back.to);
        }
    }, [back]);

    return (
        <div>
            {isPending && (
                <div className={styles.pendingWrapper} style={pendingStyle}>
                    <Spinner/>
                </div>
            )}

            <div className={wrapperClasses} style={style}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        {!!back
                            ? (
                                <img
                                    src={arrowLeft}
                                    alt="back"
                                    className={styles.backArrow}
                                    onClick={backHandler}
                                />
                            )
                            : <div/>
                        }

                        <div className={titleClasses}>
                            {title}
                        </div>

                        <CloseButton onClick={closeHandler}/>
                    </div>

                    <div className={styles.body}>
                        {children}
                    </div>
                </div>
            </div>

            <div className={backgroundClasses} onClick={closeHandler}/>
        </div>
    );
};
export default Wrapper;
