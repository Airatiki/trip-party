import { IProps } from './types';
import { IReduxState } from 'api/types';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';

import * as actions from 'api/travels/actions';


class Travels extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public componentDidMount(): void {
        this.props.get({
            city: '',
        });
    }

    public render() {
        return(
            <div>
                {
                    this.props.travels.map((travel) =>
                        <div key={travel.id}>
                            {travel.name}
                        </div>
                    )
                }
            </div>
        );
    }
}

export default compose(
    connect(
        (state: IReduxState) => ({
            travels: actions.getState(state),
            error: actions.getError(state),
            isLoaded: actions.isLoaded(state),
        }),
        (dispatch: Dispatch) => ({
            get: actions.get(dispatch),
        }),
    ),
)(Travels);
