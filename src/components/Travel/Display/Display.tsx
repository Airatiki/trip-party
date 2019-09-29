import { IProps, IReduxInjectedState, IReduxInjectedDispatch } from './types';
import { IReduxState } from 'api/types';

import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { Button, Div } from '@vkontakte/vkui';
import Icon24Write from '@vkontakte/icons/dist/24/write';

import * as profileActions from 'api/profile/actions';
import * as participantsActions from 'api/participants/actions';

import { formatDate } from 'helpers';

import Participant from 'components/Helpers/Participant';
import NewParticipant from 'components/Helpers/NewParticipant';


class Display extends Component<IProps, {ticket: {cost: string, link: string}}> {
    constructor(props: IProps) {
        super(props);

        this.state = {ticket: {cost: '10000', link: 'https://www.aviasales.ru/'}};
    }
    public onRequest = () => {
        this.props.postNew({
            VkId: this.props.profile.VkId,
            occasionId: this.props.travel.id,
        });
    };

    public async componentDidMount(): Promise<void> {
        const city = this.props.travel.guide.city;
        const travelApi = `https://autocomplete.travelpayouts.com/places2?term=${city}&locale=ru`;
        let res = await fetch(travelApi);
        res = await res.json();

        const arriveFromCode = 'LED';
        const arriveToCode = res && (res as any).length && res[0].code || 'MOW';

        // TODO: setDate
        const originDay = '10';
        const originMonth = '12';
        const destinationDay = '12';
        const destinationMonth = '12';

        // @ts-ignore
        const ticketsApi = `https://api.travelpayouts.com/v1/prices/cheap?origin=${arriveFromCode}&destination=${arriveToCode}&depart_date=2019-11&return_date=2019-12&token=99e43914f3ba819db1bc6e415528835b`;
        const randTicketsCost = Math.floor(Math.random() * (15000 - 9000) + 9000);
        let ticketsResCost = await fetch(ticketsApi);
        ticketsResCost = await ticketsResCost.json();

        const cheapestTicketCost = ticketsResCost
            && (ticketsResCost as any).data
            && (ticketsResCost as any).data[arriveToCode][0].price || randTicketsCost;

        // @ts-ignore
        const linkToTickets = `https://www.aviasales.ru/search/${arriveFromCode}${originDay}${originMonth}${arriveToCode}${destinationDay}${destinationMonth}1`;

        this.setState({ticket: {cost: cheapestTicketCost, link: linkToTickets}});
    }

    public render() {
        const {profile, travel, onEdit} = this.props;
        const isAdmin = travel.authorId === profile.VkId;
        const requestHasBeenSent = travel
            .newParticipants.find((participant) => participant.VkId === profile.VkId);

        return(
            <Fragment>
                <div>
                    <div>
                        <div className='d-flex flex-row justify-content-between align-items-center'>
                            <label style={{marginTop: '5px', fontSize: '20px'}}>
                                {travel.name}
                            </label>
                            {
                                isAdmin &&
                                <Icon24Write onClick={onEdit}/>
                            }
                            {
                                !isAdmin &&
                                <div>
                                    {
                                        requestHasBeenSent &&
                                        <Button level='secondary'>
                                            Заявка отправлена
                                        </Button>
                                    }
                                    {
                                        !requestHasBeenSent && !travel.noNewPeople &&
                                        <Button onClick={this.onRequest}>
                                            Подать заявку
                                        </Button>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        {travel.description}
                    </div>
                    <Div>
                        <div className='row'>
                            <label className='col-form-label col col-4'>
                                Даты:
                            </label>
                            <div className='col col-8'>
                                <Button level="secondary" className='w-100'>
                                    {formatDate(travel.startDate)}&nbsp;-&nbsp;{formatDate(travel.endDate)}
                                </Button>
                            </div>
                        </div>
                        {
                            travel.showTicketCost &&
                            <div className='row'>
                                <label className='col-form-label col col-4'>
                                    Билеты:
                                </label>
                                <div className='col col-8'>
                                    <Button
                                        className='w-100'
                                        onClick={() => {
                                            window.open(this.state.ticket.link, '_blank')
                                        }}
                                    >
                                        От {this.state.ticket.cost} Руб
                                    </Button>
                                </div>
                            </div>
                        }
                        {
                            travel.chatLink &&
                            <div className='row'>
                                <label className='col-form-label col col-4'>
                                    Чат:
                                </label>
                                <div className='col col-8'>
                                    <Button
                                        className='w-100'
                                        onClick={() => window.open(travel.chatLink, '_blank')}
                                    >
                                        Открыть чат
                                    </Button>
                                </div>
                            </div>
                        }
                    </Div>
                </div>
                <div>
                    {
                        isAdmin &&
                        <div>
                            {
                                !!travel.newParticipants.length &&
                                <div style={{fontSize: '12px'}}>
                                    Новые заявки на участие:
                                </div>
                            }
                            {
                                travel.newParticipants.map((participant) =>
                                    <NewParticipant
                                        key={participant.VkId}
                                        participant={participant}
                                    />
                                )
                            }
                        </div>
                    }
                </div>
                <div>
                    <div style={{fontSize: '12px'}}>
                        Участники:
                    </div>
                    {
                        travel.participants.map(
                            (participant) =>
                                <Participant
                                    key={participant.VkId}
                                    isForm={false}
                                    occasionAuthorId={travel.authorId}
                                    participant={participant}
                                />
                        )
                    }
                    {
                        !travel.participants.length &&
                        <div>Никого нет</div>
                    }
                </div>
            </Fragment>
        );
    }
}

export default compose(
    connect<IReduxInjectedState, IReduxInjectedDispatch>(
        (state: IReduxState) => ({
            profile: profileActions.getState(state),
        }),
        (dispatch: Dispatch) => ({
            postNew: participantsActions.postNew(dispatch),
            getUser: profileActions.get(dispatch)
        })
    )
)(Display);
