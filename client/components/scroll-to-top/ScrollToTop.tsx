import React, {useState, useEffect, useCallback} from 'react';

import {Props} from './types';

import styles from './ScrollToTop.scss';

function scrollToTop(smooth = false) {
    if (smooth) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    } else {
        document.documentElement.scrollTop = 0;
    }
}

/* eslint-disable import/order */
const topActionImage = (
    <img
        src={require('!!file-loader!client/assets/images/scroll-to-top.svg')}
        alt="to top"
    />
);
/* eslint-enable import/order */

const ScrollToTop: Props = ({
    top = 20,
    className = styles.scrollToTop,
    smooth = false,
    component = topActionImage,
    ...props
}) => {
    const [visible, setVisible] = useState(false);
    const onScroll = useCallback(() => {
        setVisible(document.documentElement.scrollTop > top);
    }, [top]);
    useEffect(() => {
        document.addEventListener('scroll', onScroll);

        return () => { document.removeEventListener('scroll', onScroll); };
    }, [onScroll]);
    const scrollToTopHandler = useCallback(() => scrollToTop(smooth), [smooth]);

    return (
        <>
            {visible && (
                <button
                    className={className}
                    onClick={scrollToTopHandler}
                    {...props}
                >
                    {component}
                </button>
            )}
        </>
    );
};

export default ScrollToTop;
