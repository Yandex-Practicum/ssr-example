import {FC, ReactNode, MouseEvent} from 'react';

export type OwnProps = {
    title: ReactNode;
    description?: ReactNode;
    action?: {
        handleClick: (event: MouseEvent) => void;
        title: ReactNode;
    };
};

export type Props = FC<OwnProps>;
