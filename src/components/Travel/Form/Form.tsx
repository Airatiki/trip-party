import { IProps, IState } from './types';

import React, { Component, FormEvent, Fragment } from 'react';
import {
    Button,
    Cell,
    Checkbox,
    Div,
    FormLayout,
    FormLayoutGroup,
    Input,
    Radio,
    Switch,
    Textarea
} from '@vkontakte/vkui';

import { VISIBILITY } from 'api/travels/constants';

import { dateToHtml } from 'helpers';

import Participant from 'components/Helpers/Participant';


class Form extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        const {travel} = this.props;
        this.state = {
            name: travel.name,
            description: travel.description,
            visibility: travel.visibility,
            startDate: travel.startDate,
            endDate: travel.endDate,
            showTicketCost: travel.showTicketCost,
            noNewPeople: travel.noNewPeople,
            chatLink: travel.chatLink,
        };
    }

    public onChangeVisibility = (event: FormEvent<HTMLInputElement>) => {
        // @ts-ignore
        this.setState({visibility: event.currentTarget.value});
    };

    public render() {
        return(
            <Fragment>
                <div>
                    <div>
                        <div className='d-flex flex-row justify-content-between align-items-center'>
                            <Input
                                defaultValue={this.state.name}
                                onChange={
                                    (event: FormEvent<HTMLInputElement>) =>
                                        this.setState({name: event.currentTarget.value})
                                }
                            />
                            <div>
                                <Button
                                    onClick={
                                        () => this.props.onSave({
                                            ...this.props.travel,
                                            ...this.state
                                        })
                                    }
                                >
                                    Сохранить
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Textarea
                                value={this.state.description}
                                onChange={
                                    (event: FormEvent<HTMLTextAreaElement>) =>
                                        this.setState({description: event.currentTarget.value})
                                }
                            />
                        </div>
                    </div>
                    <Div>
                        <div className='row'>
                            <label className='col-form-label col col-4'>
                                Дата начала
                            </label>
                            <div className='col col-8'>
                                <Input
                                    type='date'
                                    className='w-100'
                                    defaultValue={dateToHtml(this.state.startDate)}
                                    onChange={
                                        (event: FormEvent<HTMLInputElement>) =>
                                            this.setState({startDate: new Date(event.currentTarget.value)})
                                    }
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <label className='col-form-label col col-4'>
                                Дата конца
                            </label>
                            <div className='col col-8'>
                                <Input
                                    type='date'
                                    className='w-100'
                                    defaultValue={dateToHtml(this.state.endDate)}
                                    onChange={
                                        (event: FormEvent<HTMLInputElement>) =>
                                            this.setState({endDate: new Date(event.currentTarget.value)})
                                    }
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <label className='col-form-label col col-4'>
                                Ссылка на чат
                            </label>
                            <div className='col col-8'>
                                <Input
                                    className='w-100'
                                    defaultValue={this.state.chatLink}
                                    onChange={
                                        (event: FormEvent<HTMLInputElement>) =>
                                            this.setState({chatLink: event.currentTarget.value})
                                    }
                                />
                            </div>
                        </div>
                    </Div>
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
                    <FormLayout>
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
                        <FormLayoutGroup>
                            <Cell
                                asideContent={
                                    <Switch
                                        defaultChecked={this.state.noNewPeople}
                                        onChange={
                                            () =>
                                                this.setState({noNewPeople: !this.state.noNewPeople})
                                        }
                                    />
                                }
                            >
                                Закрыть приём новых участников
                            </Cell>
                        </FormLayoutGroup>
                    </FormLayout>
                </div>
                <div>
                    <div style={{fontSize: '12px'}}>
                        Участники:
                    </div>
                    {
                        this.props.travel.participants.map(
                            (participant) =>
                                <Participant
                                    key={participant.id}
                                    isForm={true}
                                    occasionAuthorId={this.props.travel.authorId}
                                    participant={participant}
                                />
                        )
                    }
                    {
                        !this.props.travel.participants.length &&
                        <div>Никого нет</div>
                    }
                </div>
            </Fragment>
        );
    }
}

export default Form;
