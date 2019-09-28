import { IProps, IOwnProps, IReduxInjectedDispatch, IReduxInjectedState, IState } from './types';
import { IToPut } from 'api/travels/types/instance';
import { IReduxState } from 'api/types';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { withRouter } from 'react-router';

import * as actions from 'api/travels/actions';
import * as profileActions from 'api/profile/actions';

import Display from './Display';
import Form from './Form';
import { Div } from '@vkontakte/vkui';


class Travel extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isForm: false,
        };
        // !this.props.travel && this.props.history.push('/404');
    }

    public componentDidMount(): void {
        this.props.get({city: ''}, [''], '');
    }

    public onSave = (travel: IToPut) => {
        this.props.put(travel);
        this.setState({isForm: false});
    };

    public render() {
        if (!this.props.travel) {
            return null;
        }

        const isAdmin = this.props.travel.authorId === this.props.profile.VkId;

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
                                isAdmin={isAdmin}
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
