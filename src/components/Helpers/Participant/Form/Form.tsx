import { IProps, IReduxInjectedDispatch, IState } from './types';

import { Avatar } from '@vkontakte/vkui';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import Icon24Delete from '@vkontakte/icons/dist/24/delete';

import * as action from 'api/participants/actions';
import {IReduxState} from "../../../../api/types";
import * as profileActions from "../../../../api/profile/actions";
import {IReduxInjectedState} from "../../NewParticipant/types";


class Form extends Component<IProps, IState> {
    public render() {
        const {participant} = this.props;
        return(
            <div className='d-flex flex-row justify-content-between'>
                <div className='d-flex flex-row'>
                    <Avatar src={participant.image}/>
                    <div className='d-flex flex-row align-items-center ml-1'>
                        {participant.firstName}&nbsp;{participant.lastName}
                    </div>
                </div>
                <div className='d-flex flex-row align-items-center'>
                    {
                        participant.id === this.props.occasionAuthorId &&
                        'Организатор'
                    }
                    <Icon24Delete
                        onClick={
                            () => this.props.remove(participant, this.props.profile.VkId)
                        }
                    />
                </div>
            </div>
        );
    }
}

export default compose(
    connect<IReduxInjectedState, IReduxInjectedDispatch>(
        (state: IReduxState) => ({
            profile: profileActions.getState(state)
        }),
        (dispatch: Dispatch) => ({
            remove: action.remove(dispatch),
        }),
    )
)(Form);
