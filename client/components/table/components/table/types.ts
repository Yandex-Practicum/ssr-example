import {TableHTMLAttributes, FC} from 'react';

export type OwnProps = {
    isPending?: boolean;
};

export type Props = FC<OwnProps & TableHTMLAttributes<HTMLTableElement>>;
