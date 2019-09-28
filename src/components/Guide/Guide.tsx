import { IReduxState } from 'api/types';
import { IProps, IReduxInjectedState, IReduxInjectedDispatch, IOwnProps } from './types';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose, Dispatch } from 'redux';
import { Button, Div, ScreenSpinner } from "@vkontakte/vkui";
import Icon36LikeOutline from '@vkontakte/icons/dist/36/like_outline';
import Icon36Like from '@vkontakte/icons/dist/36/like';

import * as actions from 'api/guides/actions';
import * as profileAction from 'api/profile/actions';

import Place from "./Place";


class Guide extends Component<IProps> {
    public componentDidMount(): void {
        if (!this.props.guide) {
            this.props.get({id: this.props.match.params.id})
        }
    }

    public goToTravel = () => {
        this.props.history.push({
            pathname: '/create_trip',
            state: {
                guideId: this.props.guide!.id,
            }
        });
    };

    public onDonate = () => {

    };

    public onAddLike = () => {
        this.props.postLike({
            id: this.props.guide!.id,
            userId: this.props.profile.VkId,
            isLiked: true,
        });
    };

    public onRemoveLike = () => {
        this.props.postLike({
            id: this.props.guide!.id,
            userId: this.props.profile.VkId,
            isLiked: false,
        });
    };

    public render() {
        if (!this.props.guide) {
            return <ScreenSpinner size='large'/>;
        }

        const {guide} = this.props;

        return(
            <Div>
                <div className='d-flex flex-row justify-content-between'>
                    <label style={{marginTop: '5px', fontSize: '20px'}}>
                        {guide.name}
                    </label>
                    <Button
                        onClick={this.goToTravel}
                    >
                        Создать
                    </Button>
                </div>
                <div>
                    {guide.description}
                </div>
                <Div>
                    <div className='row'>
                        <div className='col col-4'>
                            <label className='col-form-label'>
                                Город:
                            </label>
                        </div>
                        <div className='col col-8'>
                            <Button className='w-100'>
                                {guide.city}
                            </Button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col col-4'>
                            <label className='col-form-label'>
                                Бюджет:
                            </label>
                        </div>
                        <div className='col col-8'>
                            <Button className='w-100'>
                                {guide.budget}
                            </Button>
                        </div>
                    </div>
                </Div>
                <Div className='row'>
                    <Button
                        className='col col-6'
                        size='xl'
                        onClick={this.onDonate}
                    >
                        Донат
                    </Button>
                    <div className='col col-4'/>
                    <div className='col col-2 d-flex flex-row justify-content-end align-items-center'>
                        {
                            this.props.guide.hasBeenLiked ?
                                <Icon36Like onClick={this.onRemoveLike}/>
                                :
                                <Icon36LikeOutline onClick={this.onAddLike}/>
                        }
                        <div className='ml-1'>
                            {this.props.guide.likes}
                        </div>
                    </div>
                </Div>
                <Div className='d-flex flex-wrap'>
                    {
                        this.props.guide.tags.map(
                            (tag, i) =>
                                <Button key={i}>
                                    {tag}
                                </Button>
                        )
                    }
                </Div>
                <div>
                    {
                        this.props.guide.places.map(
                            (place) =>
                                <Place key={place.name} {...place}/>
                        )
                    }
                </div>
            </Div>
        );
    }
}

export default compose(
    connect<IReduxInjectedState, IReduxInjectedDispatch>(
        (state: IReduxState, props: IOwnProps) => ({
            guide: actions.getState(state).find((guide) => guide.id === props.match.params.id),
            profile: profileAction.getState(state),
        }),
        (dispatch: Dispatch) => ({
            get: actions.get(dispatch),
            postLike: actions.postLike(dispatch),
        }),
    ),
)(withRouter(Guide));
