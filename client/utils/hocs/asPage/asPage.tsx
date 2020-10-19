import React from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router';
import {compose} from 'redux';

import {bound as commonActions} from 'client/actions';
import {CommonStore} from 'client/utils/infrastructure/store';

import {Page} from './types';

export default function asPage<T>(params: Page) {
    return (ComposedComponent: React.ComponentType<T>) => {
        interface StateProps {
            isReady: boolean;
            routeProps: RouteComponentProps<any>;
        }

        type Props = StateProps & RouteComponentProps<any>;

        class Page extends React.PureComponent<Props & T> {
            public static defaultProps: Partial<Props> = {
                isReady: true, // TODO: обработать
            };

            public componentDidMount() {
                const {preloader} = params;
                const {routeProps} = this.props;

                if (preloader) {
                    preloader({routeProps});
                } else {
                    commonActions.page.setAsReady();
                }
            }

            public render() {
                const {isReady} = this.props;
                const {title} = params;

                return (
                    <React.Fragment>
                        {
                            isReady && (
                                <Helmet>
                                    <title>{title}</title>
                                </Helmet>
                            )
                        }

                        <ComposedComponent {...this.props}/>
                    </React.Fragment>
                );
            }
        }

        const mapStateToProps = (state: CommonStore, ownProps: RouteComponentProps<any>): StateProps => {
            return {
                isReady: state.page.isReady,
                routeProps: ownProps,
            };
        };

        return compose(
            withRouter,
            connect(mapStateToProps),
        )(Page);
    };
}
