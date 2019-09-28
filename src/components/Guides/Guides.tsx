import { IProps, IReduxInjectedDispatch, IReduxInjectedState } from "./types";
import { IReduxState } from "api/types";

import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose, Dispatch } from 'redux';
import { ScreenSpinner } from "@vkontakte/vkui";

import * as actions from 'api/guides/actions';


class Guides extends Component<IProps> {
    public componentDidMount(): void {
        this.props.get({});
    }

    public componentDidUpdate(): void {
        const {error} = this.props;
        error && console.log(error);
    }

    public render() {
        if (!this.props.isLoaded) {
            return <ScreenSpinner size='large'/>;
        }

        return(
            <div/>
        );
    }
}

export default compose(
    connect<IReduxInjectedState, IReduxInjectedDispatch>(
        (state: IReduxState) => ({
            guides: actions.getState(state),
            isLoaded: actions.isLoaded(state),
            error: actions.getError(state),
        }),
        (dispatch: Dispatch) => ({
            get: actions.get(dispatch),
        }),
    )
)(Guides);
