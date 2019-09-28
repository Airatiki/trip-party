import { IProps } from './types';

import React, { Fragment, Component } from 'react';
import { Button, Div } from '@vkontakte/vkui';
import Icon24Write from '@vkontakte/icons/dist/24/write';

import { formatDate } from 'helpers';

import Participant from 'components/Helpers/Participant';
import NewParticipant from 'components/Helpers/NewParticipant';


class Display extends Component<IProps> {
    public render() {
        const {isAdmin, travel, onEdit} = this.props;

        return(
            <Fragment>
                <div>
                    <div>
                        <div className='d-flex flex-row justify-content-between align-items-center'>
                            <label style={{marginTop: '5px', fontSize: '20px'}}>
                                {travel.name}
                            </label>
                            <Icon24Write onClick={onEdit}/>
                        </div>
                    </div>
                    <div>
                        {travel.description}
                    </div>
                    <Div>
                        <div className='row'>
                            <div className='col col-4'>
                                <label className='col-form-label'>
                                    Место:
                                </label>
                            </div>
                            <div className='col col-8'>
                                <Button className='w-100'>
                                    {travel.place}
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
                                    <Button className='w-100'>
                                        TODO
                                    </Button>
                                </div>
                            </div>
                        }
                        <div className='row'>
                            <label className='col-form-label col col-4'>
                                Бюджет:
                            </label>
                            <div className='col col-8'>
                                <Button className='w-100'>
                                    {travel.budget}
                                </Button>
                            </div>
                        </div>
                        <div className='row'>
                            <label className='col-form-label col col-4'>
                                Даты:
                            </label>
                            <div className='col col-8'>
                                <Button className='w-100'>
                                    {formatDate(travel.startDate)}&nbsp;-&nbsp;{formatDate(travel.endDate)}
                                </Button>
                            </div>
                        </div>
                        <div className='row'>
                            <label className='col-form-label col col-4'>
                                Чат:
                            </label>
                            <div className='col col-8'>
                                <Button className='w-100'>
                                    Открыть чат
                                </Button>
                            </div>
                        </div>
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

export default Display;
