import { IProps } from './types';
import { IReduxState } from 'api/types';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';

import * as actions from 'api/travels/actions';
import * as profileActions from 'api/profile/actions';
import {platform, ScreenSpinner, Tabs, TabsItem} from "@vkontakte/vkui";
import {OS} from "@vkontakte/vkui/dist/lib/platform";
import TravelDemo from "./TravelDemo";

class Travels extends Component<IProps> {
    public theme = 'light';

    constructor(props: IProps) {
        super(props);

        this.theme = platform() === OS.IOS ? 'header' : 'light';
    }

    public componentDidMount(): void {
        this.props.get({}, this.props.profile.friends, this.props.profile.VkId);
    }

    public componentDidUpdate(): void {
        const {error} = this.props;
        error && console.log(error);
    }

    public render() {
        if (!this.props.isLoaded) {
            return <ScreenSpinner size='large'/>
        }

        return(
            <div className='background-screen'>
                {}
                <Tabs theme={this.theme}>
                    <TabsItem
                        onClick={() => this.setState({ activeTab1: 'music' })}
                        selected={true}
                    >
                        Путешествия
                    </TabsItem>
                    <TabsItem
                        onClick={() => this.setState({ activeTab1: 'recomendations' })}
                        selected={false}
                    >
                        События
                    </TabsItem>
                </Tabs>
                {
                    this.props.travels.map((travel) =>
                        <TravelDemo key={travel.id} travel={travel}/>
                    )
                }
            </div>
        );
    }
}

export default compose(
    connect(
        (state: IReduxState) => ({
            travels: actions.getState(state),
            profile: profileActions.getState(state),
            error: actions.getError(state),
            isLoaded: actions.isLoaded(state),
        }),
        (dispatch: Dispatch) => ({
            get: actions.get(dispatch),
        }),
    ),
)(Travels);
