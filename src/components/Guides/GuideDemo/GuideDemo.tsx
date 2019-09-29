import {IProps} from "./types";

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {Div, Group} from "@vkontakte/vkui";

import './GuideDemo.css';


class GuideDemo extends Component<IProps> {
    public goTo = () => {
        this.props.history.push(`/guides/${this.props.guide.id}`);
    };

    public render() {
        return(
            <Group className='travel-demo-container' onClick={this.goTo}>
                <Div>
                    <div className='title'>
                        {this.props.guide.name}
                    </div>
                    <div className='description'>
                        {this.props.guide.description}
                    </div>
                </Div>
            </Group>
        );
    }
}
// @ts-ignore
export default withRouter(GuideDemo);
// @ts-ignore
