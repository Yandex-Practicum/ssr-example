import {FC, MouseEvent} from 'react';

export type OwnProps = {
    onClick?: (event: MouseEvent) => void;
};

export type Props = FC<OwnProps>;
