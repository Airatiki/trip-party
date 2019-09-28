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


class Display extends Component<IProps> {
    public onRequest = () => {
        this.props.postNew({
            VkId: this.props.profile.VkId,
            occasionId: this.props.travel.id,
        });
    };

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
                                <Button
                                    className='w-100'
                                    onClick={() => window.open(travel.chatLink, '_blank')}
                                >
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

export default compose(
    connect<IReduxInjectedState, IReduxInjectedDispatch>(
        (state: IReduxState) => ({
            profile: profileActions.getState(state),
        }),
        (dispatch: Dispatch) => ({
            postNew: participantsActions.postNew(dispatch),
        })
    )
)(Display);
