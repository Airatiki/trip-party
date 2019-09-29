import { VISIBILITY } from '../../api/travels/constants';
import { dateToHtml } from '../../helpers';
import { IReduxState } from "api/types";
import { IProps, IReduxInjectedDispatch, IReduxInjectedState, IState } from './types';

import React, { Component, FormEvent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose, Dispatch } from 'redux';
import {
    Input,
    FormLayout,
    FormLayoutGroup,
    Radio,
    Textarea,
    Checkbox,
    Button,
    PanelHeader,
    Div
} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';

import * as travelsActions from 'api/travels/actions';
import * as profileActions from 'api/profile/actions';
import * as guidesActions from 'api/guides/actions';
import Footer from "../Footer/Footer";


class CreateTravel extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: '',
            startDate: new Date(),
            endDate: new Date(),
            description: '',
            visibility: VISIBILITY.FRIENDS,
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

    public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>): void {
        if (prevProps.travels.length < this.props.travels.length) {
            const travel = this.props.travels.find(
                (travel) =>
                    !prevProps.travels.find((prevTravel) => travel.id === prevTravel.id)
            );
            this.props.history.push(`/trips/${travel!.id}`);
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
        const guide = this.props.guides.find((guide) => guide.id === this.props.location!.state!.guideId);
        this.props.post({
            ...this.state,
            guide: guide!,
            authorId: this.props.profile.VkId,
        });
    };

    public render() {
        return(
            <Fragment>
                <PanelHeader
                    left={
                        <Div className='d-flex flex-row'>
                            <Icon24BrowserBack
                                className='mr-2'
                                onClick={this.props.history.goBack}
                            />
                        </Div>
                    }
                    children={
                        <div>Путешествие</div>
                    }
                />
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
                            value={VISIBILITY.ALL}
                            checked={this.state.visibility === VISIBILITY.ALL}
                            onChange={this.onChangeVisibility}
                        >
                            Всем
                        </Radio>
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
                <div className='mb-5'>
                    <Footer/>
                </div>
            </Fragment>
        );
    }
}

export default compose(
    connect<IReduxInjectedState, IReduxInjectedDispatch>(
        (state: IReduxState) => ({
            profile: profileActions.getState(state),
            guides: guidesActions.getState(state),
            travels: travelsActions.getState(state),
        }),
        (dispatch: Dispatch) => ({
            post: travelsActions.post(dispatch),
        }),
    )
)(withRouter(CreateTravel));
