import { IProps, IOwnProps, IReduxInjectedDispatch, IReduxInjectedState, IState } from './types';
import { IToPut } from 'api/travels/types/instance';
import { IReduxState } from 'api/types';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { withRouter } from 'react-router';
import { Div, ScreenSpinner } from '@vkontakte/vkui';

import * as actions from 'api/travels/actions';
import * as profileActions from 'api/profile/actions';

import Display from './Display';
import Form from './Form';


class Travel extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isForm: false,
        };
    }

    public componentDidMount(): void {
        if (!this.props.travel) {
            this.props.get(
                {id: this.props.match.params.id},
                this.props.profile.friends,
                this.props.profile.VkId,
            );
        }
    }

    public onSave = (travel: IToPut) => {
        this.props.put(travel);
        this.setState({isForm: false});
    };

    public render() {
        if (!this.props.travel) {
            return <ScreenSpinner size='large'/>;
        }

        return(
            <Div>
                {
                    this.state.isForm ?
                        (
                            <Form
                                travel={this.props.travel!}
                                onSave={this.onSave}
                            />
                        )
                        :
                        (
                            <Display
                                travel={this.props.travel!}
                                onEdit={() => this.setState({isForm: true})}
                            />
                        )
                }
            </Div>
        )
    }
}

export default compose(
    connect<IReduxInjectedState, IReduxInjectedDispatch>(
        (state: IReduxState, props: IOwnProps) => ({
            travel: actions.getState(state).find((travel) => travel.id === props.match.params.id),
            profile: profileActions.getState(state),
        }),
        (dispatch: Dispatch) => ({
            get: actions.get(dispatch),
            put: actions.put(dispatch),
        }),
    ),
)(withRouter(Travel));
