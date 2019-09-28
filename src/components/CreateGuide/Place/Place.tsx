import { IProps, IState } from "./types";

import React, { Component, FormEvent } from 'react';
import Icon28Write from '@vkontakte/icons/dist/28/write';
import Icon28Delete from '@vkontakte/icons/dist/28/delete';
import Icon28DoneOutline from '@vkontakte/icons/dist/28/done_outline';
import { Div, FormLayout, FormLayoutGroup, Input, Textarea } from "@vkontakte/vkui";
import LeafletSearch from "../../Helpers/LeafletSearch";


class Place extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isShown: false,

            name: this.props.name,
            description: this.props.description,
            photo: this.props.photo,
            lat: this.props.lat,
            lng: this.props.lng,
        };
    }

    public onSave = () => {
        this.props.onSave(
            this.props.index,
            {
                name: this.state.name,
                description: this.state.description,
                photo: this.state.photo,
                lat: this.state.lat,
                lng: this.state.lng,
            }
        );
        this.setState({isShown: false})
    };
    
    public render() {
        return(
            <Div>
                <div className='d-flex flex-row justify-content-between'>
                    <div>
                        {this.props.name}
                    </div>
                    <div className='d-flex flex-row'>
                        {
                            this.state.isShown &&
                            <Icon28DoneOutline
                                onClick={this.onSave}
                            />
                        }
                        {
                            !this.state.isShown &&
                            <Icon28Write
                                onClick={
                                    () =>
                                        this.setState({isShown: true})
                                }
                            />
                        }
                        <Icon28Delete
                            className='ml-2'
                            onClick={() => this.props.onRemove(this.props.index)}
                        />
                    </div>
                </div>
                {
                    this.state.isShown &&
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
                        <LeafletSearch
                            onChange={
                                (data: {lat: string, lng: string}) =>
                                    this.setState({...data})}
                            defaultLatLng={{
                                lat: this.state.lat,
                                lng: this.state.lng,
                            }}
                        />
                    </FormLayout>
                }
            </Div>
        );
    }
}

export default Place;
