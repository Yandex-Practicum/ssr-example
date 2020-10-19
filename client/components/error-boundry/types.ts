import {ReactNode, ErrorInfo} from 'react';
import {Nullable} from 'utils';

export interface State {
    error: Nullable<Error>;
    errorInfo: Nullable<ErrorInfo>;
}

export interface Props {
    children: ReactNode;
}
