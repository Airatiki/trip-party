import { IReduxState } from '../../api/types';
import { IProps, IReduxInjectedState, IReduxInjectedDispatch, IState } from './types';

import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { Button, Cell, FormLayout, FormLayoutGroup, Radio, Switch } from '@vkontakte/vkui';

import { VISIBILITY } from 'api/travels/constants';
import * as actions from 'api/profile/actions';


class Settings extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            travelsVisibility: this.props.profile.travelsVisibility,
            travelsAnonymity: this.props.profile.travelsAnonymity,
        };
    }

    public onChangeTravelsVisibility = (event: FormEvent<HTMLInputElement>) => {
        // @ts-ignore
        this.setState({travelsVisibility: event.currentTarget.value});
    };

    public onChangeEventsVisibility = (event: FormEvent<HTMLInputElement>) => {
        // @ts-ignore
        this.setState({eventsVisibility: event.currentTarget.value});
    };

    public onSave = () => {
        this.props.put({
            ...this.props.profile,
            ...this.state,
        });
    };

    public render() {
        return(
            <FormLayout>
                <FormLayoutGroup top='Показывать путешествия'>
                    <Radio
                        name='travelsVisibility'
                        value={VISIBILITY.FRIENDS}
                        checked={this.state.travelsVisibility === VISIBILITY.FRIENDS}
                        onChange={this.onChangeTravelsVisibility}
                    >
                        Только друзей
                    </Radio>
                    <Radio
                        name='travelsVisibility'
                        value={VISIBILITY.FRIENDS_FRIENDS}
                        checked={this.state.travelsVisibility === VISIBILITY.FRIENDS_FRIENDS}
                        onChange={this.onChangeTravelsVisibility}
                    >
                        Друзей и друзей друзей
                    </Radio>
                    <Radio
                        name='travelsVisibility'
                        value={VISIBILITY.ALL}
                        checked={this.state.travelsVisibility === VISIBILITY.ALL}
                        onChange={this.onChangeTravelsVisibility}
                    >
                        Все
                    </Radio>
                </FormLayoutGroup>
                <FormLayoutGroup>
                    <Cell
                        asideContent={
                            <Switch
                                defaultChecked={!this.state.travelsAnonymity}
                                onChange={
                                    () =>
                                        this.setState({travelsAnonymity: !this.state.travelsAnonymity})
                                }
                            />
                        }
                    >
                        Мои друзья видят мои путешествия
                    </Cell>
                </FormLayoutGroup>
                <Button
                    size='xl'
                    onClick={this.onSave}
                >
                    Сохранить
                </Button>
            </FormLayout>
        );
    }
}

export default compose(
    connect<IReduxInjectedState, IReduxInjectedDispatch>(
        (state: IReduxState) => ({
            profile: actions.getState(state),
        }),
        (dispatch: Dispatch) => ({
            put: actions.put(dispatch),
        }),
    )
)(Settings);
