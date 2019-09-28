import { IProps, IReduxInjectedState, IReduxInjectedDispatch, IState } from "./types";
import { IReduxState } from "api/types";

import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { Button, FormLayout, FormLayoutGroup, Input, Textarea } from "@vkontakte/vkui";

import * as actions from 'api/guides/actions';
import * as profileActions from 'api/profile/actions';

import Tags from './Tags';


class CreateGuide extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: '',
            description: '',
            city: '',
            authorId: this.props.profile.VkId,
            likes: 0,
            budget: '',
            donateLink: '',
            places: [],
            tags: [],
        };
    }

    public onSave = () => {
        this.props.post({
            ...this.state,
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
                <FormLayoutGroup top='Описание'>
                    <Textarea
                        value={this.state.description}
                        onChange={
                            (event: FormEvent<HTMLTextAreaElement>) =>
                                this.setState({description: event.currentTarget.value})
                        }
                    />
                </FormLayoutGroup>
                <FormLayoutGroup top='Бюджет'>
                    <Input
                        defaultValue={this.state.budget}
                        onChange={
                            (event: FormEvent<HTMLInputElement>) =>
                                this.setState({budget: event.currentTarget.value})
                        }
                    />
                </FormLayoutGroup>
                <FormLayoutGroup top='Ссылка на донат'>
                    <Input
                        defaultValue={this.state.donateLink}
                        onChange={
                            (event: FormEvent<HTMLInputElement>) =>
                                this.setState({donateLink: event.currentTarget.value})
                        }
                    />
                </FormLayoutGroup>
                <FormLayoutGroup top='Тэги'>
                    <Tags
                        addedTags={this.state.tags}
                        onChange={
                            (tags) =>
                                this.setState({tags})
                        }
                    />
                </FormLayoutGroup>
                <FormLayoutGroup top='Места'>
                    <div/>
                </FormLayoutGroup>
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
            post: actions.post(dispatch),
        }),
    ),
)(CreateGuide);
