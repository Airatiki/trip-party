import {IProps} from "./types";

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {Cell, Div, Group, Avatar} from "@vkontakte/vkui";

import './TravelDemo.css';


class TravelDemo extends Component<IProps> {
    public goTo = () => {
        this.props.history.push(`/trips/${this.props.travel.id}`);
    };

    public render() {
        return(
            <Group className='travel-demo-container' onClick={this.goTo}>
                <Div>
                    <div className='title'>Поездка  на  Burning Man</div>
                    <div className='description'>Собираем компанию в лагерь на бернинг! Примерный бюджет поездки по 2500$ c человека</div>
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
                            description={<span>(Среди них 2 Ваших друга)</span>}
                            // bottomContent={<Button>Добавить</Button>}
                        >
                            <span className='participants-title'>8 человек</span>
                        </Cell>
                    </div>
                </Div>
            </Group>
        );
    }
}

export default withRouter(TravelDemo);
