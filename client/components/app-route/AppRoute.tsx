import React from 'react';
import {Route, RouteComponentProps} from 'react-router';

import ErrorBoundry from 'client/components/error-boundry';

import {Props} from './types';

export default class AppRoute extends React.PureComponent<Props> {
    private renderContent = (routerProps: RouteComponentProps) => {
        const {componentProps} = this.props;
        const Component = this.props.component as any;

        return (
            <ErrorBoundry>
                <Component {...routerProps} {...componentProps}/>
            </ErrorBoundry>
        );
    }

    public render() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {component, componentProps, ...props} = this.props;

        return (
            <Route
                {...props}
                render={this.renderContent}
            />
        );
    }
}
