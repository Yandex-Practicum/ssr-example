import {FC, CSSProperties, ReactNode} from 'react';

export type OwnProps = {
    width?: CSSProperties['width'];
    visible?: boolean;
    isPending?: boolean;
    title?: ReactNode;
    back?: {
        to?: string;
    };

    handleClose?: () => void;
};

export type Props = FC<OwnProps>;
