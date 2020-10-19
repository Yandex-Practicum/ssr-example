import {TdHTMLAttributes, FC} from 'react';

export type OwnProps = {
    type?: 'head' | 'common';
};

export type Props = FC<OwnProps & TdHTMLAttributes<HTMLTableDataCellElement>>;
