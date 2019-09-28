import { IProps, IReduxInjectedDispatch, IState } from './types';

import { Avatar } from '@vkontakte/vkui';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import Icon24Delete from '@vkontakte/icons/dist/24/delete';

import * as action from 'api/participants/actions';


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
                            () => this.props.remove(participant)
                        }
                    />
                </div>
            </div>
        );
    }
}

export default compose(
    connect<null, IReduxInjectedDispatch>(
        null,
        (dispatch: Dispatch) => ({
            remove: action.remove(dispatch),
        }),
    )
)(Form);
