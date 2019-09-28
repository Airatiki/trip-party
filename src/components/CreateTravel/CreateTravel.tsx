import { VISIBILITY } from '../../api/travels/constants';
import { dateToHtml } from '../../helpers';
import { IProps, IReduxInjectedDispatch, IReduxInjectedState, IState } from './types';

import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose, Dispatch } from 'redux';
import { Input, FormLayout, FormLayoutGroup, Radio, Textarea, Checkbox, Button } from '@vkontakte/vkui';

import * as travelsActions from 'api/travels/actions';
import * as profileActions from 'api/profile/actions';
import { IReduxState } from "../../api/types";


class CreateTravel extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: '',
            startDate: new Date(),
            endDate: new Date(),
            place: '',
            description: '',
            visibility: VISIBILITY.FRIENDS,
            budget: '',
            showTicketCost: true,
            chatLink: '',
        };
        if (!this.props.location.state) {
            this.props.history.push('/404');
            return;
        }
        if (!this.props.location.state.guideId) {
            this.props.history.push('/404')
        }
    }

    public onChangeType = (event: FormEvent<HTMLInputElement>) => {
        // @ts-ignore
        this.setState({type: event.currentTarget.value});
    };

    public onChangeVisibility = (event: FormEvent<HTMLInputElement>) => {
        // @ts-ignore
        this.setState({visibility: event.currentTarget.value});
    };

    public onSave = () => {
        this.props.post({
            ...this.state,
            guideId: this.props.location.state!.guideId!,
            authorId: this.props.profile.VkId,
        });
    };

    public render() {
        return(
            <FormLayout>
                <FormLayoutGroup top='Название'>
                    <Input
                        defaultValue={this.state.name}
                        onChange={
                            (event: FormEvent<HTMLInputElement>) =>
                                this.setState({name: event.currentTarget.value})
                        }
                    />
                </FormLayoutGroup>

                <FormLayoutGroup top='Дата начала'>
                    <Input
                        type='date'
                        defaultValue={dateToHtml(this.state.startDate)}
                        onChange={
                            (event: FormEvent<HTMLInputElement>) =>
                                this.setState({startDate: new Date(event.currentTarget.value)})
                        }
                    />
                </FormLayoutGroup>
                <FormLayoutGroup top='Дата конца'>
                    <Input
                        type='date'
                        defaultValue={dateToHtml(this.state.endDate)}
                        onChange={
                            (event: FormEvent<HTMLInputElement>) =>
                                this.setState({endDate: new Date(event.currentTarget.value)})
                        }
                    />
                </FormLayoutGroup>
                <FormLayoutGroup top='Место'>
                    <Input
                        defaultValue={this.state.place}
                        onChange={
                            (event: FormEvent<HTMLInputElement>) =>
                                this.setState({place: event.currentTarget.value})
                        }
                    />
                </FormLayoutGroup>
                <FormLayoutGroup top='Описание'>
                    <Textarea
                        value={this.state.description}
                        onChange={
                            (event: FormEvent<HTMLTextAreaElement>) =>
                                this.setState({description: event.currentTarget.value})
                        }
                    />
                </FormLayoutGroup>
                <FormLayoutGroup top='Ссылка на чат'>
                    <Input
                        className='w-100'
                        defaultValue={this.state.chatLink}
                        onChange={
                            (event: FormEvent<HTMLInputElement>) =>
                                this.setState({chatLink: event.currentTarget.value})
                        }
                    />
                </FormLayoutGroup>
                <FormLayoutGroup top='Видимость'>
                    <Radio
                        name='visibility'
                        value={VISIBILITY.FRIENDS}
                        checked={this.state.visibility === VISIBILITY.FRIENDS}
                        onChange={this.onChangeVisibility}
                    >
                        Только друзьям участников
                    </Radio>
                    <Radio
                        name='visibility'
                        value={VISIBILITY.FRIENDS_FRIENDS}
                        checked={this.state.visibility === VISIBILITY.FRIENDS_FRIENDS}
                        onChange={this.onChangeVisibility}
                    >
                        Друзьям и друзьям друзей участников
                    </Radio>
                    <Radio
                        name='visibility'
                        value={VISIBILITY.ALL}
                        checked={this.state.visibility === VISIBILITY.ALL}
                        onChange={this.onChangeVisibility}
                    >
                        Всем
                    </Radio>
                </FormLayoutGroup>
                <FormLayoutGroup top='Примерный бюджет на человека'>
                    <Input
                        defaultValue={this.state.budget}
                        onChange={
                            (event: FormEvent<HTMLInputElement>) =>
                                this.setState({budget: event.currentTarget.value})
                        }
                    />
                </FormLayoutGroup>
                <Checkbox
                    className='d-none'
                    defaultChecked={this.state.showTicketCost}
                    onChange={
                        () =>
                            this.setState({showTicketCost: !this.state.showTicketCost})
                    }
                >
                    Показывать стоимость авиабилетов
                </Checkbox>
                <Button size='xl' onClick={this.onSave}>
                    Сохранить
                </Button>
            </FormLayout>
        );
    }
}

export default compose(
    connect<IReduxInjectedState, IReduxInjectedDispatch>(
        (state: IReduxState) => ({
            profile: profileActions.getState(state),
        }),
        (dispatch: Dispatch) => ({
            post: travelsActions.post(dispatch),
        })
    )
)(withRouter(CreateTravel));
