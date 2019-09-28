import React, { Component } from 'react';

import './TravelDemo.css';
import {Cell, Div, Group} from "@vkontakte/vkui";
import {IProps} from "./types";


class TravelDemo extends Component<IProps> {

    public render() {
        return(
            <Group className='container'>
                <Div>
                    <div className='title'>Поездка  на  Burning Man</div>
                    <div className='description'>Собираем компанию в лагерь на бернинг! Примерный бюджет поездки по 2500$ c человека</div>
                    <div className='participants-header'>Участники:</div>
                    <div className='participants-container'>
                        {/*    if (!!this.props.travel.demoParticipants) {*/}
                        {/*    this.props.travel.demoParticipants!.map((avatar) => {*/}
                        {/*    return <Avatar key={avatar} size={44} src={avatar!}/>*/}
                        {/*})*/}
                        {/*    }*/}


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

export default TravelDemo;
