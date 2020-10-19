import {FC, ButtonHTMLAttributes} from 'react';

export type OwnProps = {
    theme?: 'danger' | 'success' | 'primary' | 'secondary';
    variant?: 'outlined' | 'filled';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type Props = FC<OwnProps>;
