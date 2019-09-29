import { IReduxState } from 'api/types';
import { IProps, IReduxInjectedState, IReduxInjectedDispatch, IOwnProps } from './types';

import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose, Dispatch } from 'redux';
import { Button, Div, ScreenSpinner, Group, List, Cell, PanelHeader } from "@vkontakte/vkui";
import Icon36LikeOutline from '@vkontakte/icons/dist/36/like_outline';
import Icon36Like from '@vkontakte/icons/dist/36/like';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';

import * as actions from 'api/guides/actions';
import * as profileAction from 'api/profile/actions';

import Place from "./Place";
import Footer from "../Footer/Footer";


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
        window.open(`https://vk.me/moneysend/${this.props.profile.VkId}`);
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
            <Fragment>
                <PanelHeader
                    left={
                        <Div className='d-flex flex-row'>
                            <Icon24BrowserBack
                                className='mr-3'
                                onClick={this.props.history.goBack}
                            />
                        </Div>
                    }
                    children={
                        <div>Гайд</div>
                    }
                />
                <Group>
                    <List>
                        <Cell>
                            <div className='d-flex flex-row justify-content-between'>
                                <label className='col-form-label' style={{fontSize: '20px'}}>
                                    {guide.name}
                                </label>
                                <Button
                                    size='l'
                                    onClick={this.goToTravel}
                                >
                                    Создать
                                </Button>
                            </div>
                        </Cell>
                    </List>
                </Group>
                <Group>
                    <List>
                        <Cell multiline={true}>
                            {guide.description}
                        </Cell>
                    </List>
                </Group>
                <Group>
                    <List>
                        <Cell>
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
                        </Cell>
                        <Cell>
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
                        </Cell>
                    </List>
                </Group>
                <Group>
                    <List>
                        <Div className='d-flex flex-row justify-content-between'>
                            <div className='col col-8' style={{marginLeft: '-15px'}}>
                                <Button
                                    className='w-100'
                                    size='xl'
                                    onClick={this.onDonate}
                                >
                                    Донат
                                </Button>
                            </div>
                            <div className='d-flex flex-row justify-content-end align-items-center'>
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
                    </List>
                </Group>
                <Group>
                    <List className='d-flex flex-wrap'>
                        <Div>
                            {
                                this.props.guide.tags.map(
                                    (tag, i) =>
                                        <Button key={i}>
                                            {tag}
                                        </Button>
                                )
                            }
                        </Div>
                    </List>
                </Group>
                <Group title='Места'>
                    {
                        this.props.guide.places.map(
                            (place) =>
                                <Place key={place.name} {...place}/>
                        )
                    }
                </Group>
                <div className='mt-4'>
                    <Footer/>
                </div>
            </Fragment>
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
