import { IProps, IReduxInjectedState, IReduxInjectedDispatch, IState } from "./types";
import { IReduxState } from "api/types";

import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { Button, FormLayout, FormLayoutGroup, Input, Textarea, Div } from "@vkontakte/vkui";
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';

import * as actions from 'api/guides/actions';
import * as profileActions from 'api/profile/actions';

import Tags from './Tags';
import Place from "./Place";
import { IPlace } from "../../api/guides/types/instance";


class CreateGuide extends Component<IProps, IState> {
    public defaultPlace: IPlace = {
        name: 'Новое место',
        description: '',
        photo: '',
        lat: '59.93318000000005',
        lng: '30.306040000000053',
    };
    
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: '',
            description: '',
            city: '',
            authorId: this.props.profile.VkId,
            likes: 0,
            budget: '',
            places: [],
            tags: [],
        };
    }

    public onSave = () => {
        this.props.post({
            ...this.state,
        });
    };

    public onAddNewPlace = () => {
        const {places} = this.state;
        this.setState({
            places: [...places, {...this.defaultPlace}],
        });
    };


    public onSavePlace = (index: number, place: IPlace) => {
        const {places} = this.state;

        places[index] = {
            ...place,
        };
        this.setState({places: [...places]});
    };

    public onRemovePlace = (index: number) => {
        const {places} = this.state;

        this.setState({
            places: places.filter((place, i) => index !== i),
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
                    {
                        this.state.places.map(
                            (place, i) =>
                                <Place
                                    key={i}
                                    index={i}
                                    onSave={this.onSavePlace}
                                    onRemove={this.onRemovePlace}
                                    {...place}
                                />
                        )
                    }
                    <Div className='d-flex flex-row justify-content-end'>
                        <Icon28AddOutline
                            onClick={this.onAddNewPlace}
                        />
                    </Div>
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
