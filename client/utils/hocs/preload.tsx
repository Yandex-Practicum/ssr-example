import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import {Preload} from 'page';
import React, {ComponentClass} from 'react';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router';
import {compose} from 'redux';

import {bound as commonActions} from 'client/actions';
import makeModel from 'client/utils/infrastructure/makeModel';
import {CommonStore} from 'client/utils/infrastructure/store';

export default function preload<E>(params: Preload<E>) {
    const {isReload = true} = params;
    let isFinal = false;

    return (ComposedComponent: React.ComponentType<E>) => {
        interface StateProps {
            isReady: boolean;
        }

        type OwnProps<E> = E & RouteComponentProps<any>;

        type Props = StateProps & OwnProps<E>;

        interface PreloadProcessOptions {
            isRestart?: boolean;
        }
        const omittedProps = [
            makeModel<Props>(m => m?.isReady),
        ];

        class PreloadPage extends React.PureComponent<Props> {
            public componentDidMount() {
                if (!isFinal || (isReload && isFinal)) {
                    this.preload({isRestart: false});
                }
            }

            public componentDidUpdate(prevProps: Readonly<Props>) {
                if (isReload && !isFinal && !isEqual(prevProps.location.pathname, this.props.location.pathname)) {
                    this.preload({isRestart: true});
                }
            }

            public componentWillUnmount() {
                const {onDispose} = params;

                if (onDispose) {
                    onDispose(omit(this.props, omittedProps));
                }
            }

            public render() {
                return (
                    <React.Fragment>
                        <ComposedComponent {...this.props}/>
                    </React.Fragment>
                );
            }

            private preload = ({isRestart}: PreloadProcessOptions) => {
                commonActions.preload[
                    (isRestart ? 'setAsReStart' : 'setAsStart') as keyof typeof commonActions.preload
                ]();

                this.preloadProc()
                    .then(commonActions.preload.setAsReady)
                    .catch(commonActions.preload.setAsErrorReady)
                    .finally(() => {
                        isFinal = true;
                    });
            };

            private preloadProc = () => {
                const {onLoad} = params;

                if (!onLoad) {
                    return Promise.resolve();
                }

                return new Promise(async (resolve, reject) => {
                    try {
                        await onLoad(omit(this.props, omittedProps) as E);
                        return resolve();
                    } catch (e) {
                        return reject(e);
                    }
                });
            }
        }

        const mapStateToProps = (state: CommonStore): StateProps => ({
            isReady: state.preload.isReady,
        });

        return compose<ComponentClass<E>>(
            withRouter,
            connect(mapStateToProps),
        )(PreloadPage);
    };
}
