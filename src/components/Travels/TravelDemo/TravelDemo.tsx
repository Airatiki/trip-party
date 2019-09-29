import {IProps} from "./types";

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {Cell, Div, Group, Avatar} from "@vkontakte/vkui";

import { getFriendsCount } from 'api/travels/functions';

import './TravelDemo.css';


class TravelDemo extends Component<IProps> {
    public goTo = () => {
        this.props.history.push(`/trips/${this.props.travel.id}`);
    };

    public formatHuman = (count: number) => {
        const CHELOVEK = 'человек';
        const CHELOVEKA = 'человека';

        switch (count) {
            case 1:
                return CHELOVEK;
            case 2:
            case 3:
            case 4:
                return CHELOVEKA;
            default:
                return CHELOVEK;
        }
    };

    public formatFriend = (count: number) => {
        const DRUG = 'друг';
        const DRUGA = 'друга';
        const DRUZEY = 'друзей';

        switch (count) {
            case 1:
                return DRUG;
            case 2:
            case 3:
            case 4:
                return DRUGA;
            default:
                return DRUZEY;
        }
    };

    public render() {
        const participantsCount = this.props.travel.participants.length;
        const friendsCount = getFriendsCount(this.props.travel, this.props.friends);

        return(
            <Group className='travel-demo-container' onClick={this.goTo}>
                <Div>
                    <div className='title'>
                        {this.props.travel.name}
                    </div>
                    <div className='description'>
                        {this.props.travel.description}
                    </div>
                    <div className='participants-header'>Участники:</div>
                    <div className='participants-container'>
                        {
                            (this.props.travel.demoParticipants || []).map((avatar) => {
                                return <Avatar key={avatar} size={44} src={avatar!}/>
                            })
                        }

                        <Cell
                            className='keken'
                            size="m"
                            description={
                                <span>(Среди них {friendsCount} Ваших {this.formatFriend(friendsCount)})</span>}
                        >
                            <span className='participants-title'>
                                {participantsCount}&nbsp;{this.formatHuman(participantsCount)}
                            </span>
                        </Cell>
                    </div>
                </Div>
            </Group>
        );
    }
}
// @ts-ignore
export default withRouter(TravelDemo);
// @ts-ignore
