import { IProps, IReduxInjectedDispatch } from './types';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { Cell, Button, Avatar } from '@vkontakte/vkui';

import * as actions from 'api/participants/actions';


class NewParticipant extends Component<IProps> {
    public render() {
        const {participant} = this.props;

        return(
            <Cell
                bottomContent={
                    <div>
                        <Button
                            className='mr-2'
                            onClick={() => this.props.accept(participant)}
                        >
                            Принять
                        </Button>
                        <Button
                            onClick={() => this.props.reject(participant)}
                        >
                            Отклонить
                        </Button>
                    </div>
                }
                before={<Avatar src={participant.image} size={80}/>}
                size="l"
            >
                {participant.firstName}&nbsp;{participant.lastName}
            </Cell>
        );
    }
}

export default compose(
    connect<null, IReduxInjectedDispatch>(
        null,
        (dispatch: Dispatch) => ({
            accept: actions.post(dispatch),
            reject: actions.removeNew(dispatch),
        }),
    )
)(NewParticipant);
