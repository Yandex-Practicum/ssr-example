import {FC, HTMLAttributes} from 'react';

export type OwnProps = {
    top?: number;
    smooth?: boolean;
    component?: React.ReactNode;
};

export type Props = FC<HTMLAttributes<HTMLButtonElement> & OwnProps>;
