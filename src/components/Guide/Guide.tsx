import { IReduxState } from 'api/types';
import { IProps, IReduxInjectedState, IReduxInjectedDispatch, IOwnProps } from './types';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { ScreenSpinner } from "@vkontakte/vkui";

import * as actions from 'api/guides/actions';


class Guide extends Component<IProps> {
    public render() {
        if (!this.props.guide) {
            return <ScreenSpinner size='large'/>;
        }

        return(
            <div/>
        );
    }
}

export default compose(
    connect<IReduxInjectedState, IReduxInjectedDispatch>(
        (state: IReduxState, props: IOwnProps) => ({
            guide: actions.getState(state).find((guide) => guide.id === props.match.params.id),
        }),
        (dispatch: Dispatch) => ({
            get: actions.get(dispatch),
        }),
    ),
)(Guide);
