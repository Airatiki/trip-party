import { IProps } from './types';

import React, { Component } from 'react';
import { Avatar } from '@vkontakte/vkui';


class Display extends Component<IProps> {
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
                </div>
            </div>
        );
    }
}

export default Display;
