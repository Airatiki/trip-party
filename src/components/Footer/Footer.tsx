import { IProps } from "./types";

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';


class Footer extends Component<IProps> {
    public render() {
        const {pathname} = this.props.history.location;

        return(
            <Epic
                activeStory=''
                tabbar={
                    <Tabbar>
                        <TabbarItem
                            selected={pathname === '/guides'}
                            onClick={
                                () =>
                                    pathname !== '/guides' && this.props.history.push('/guides')
                            }
                        >
                            <Icon28Search/>
                        </TabbarItem>
                        <TabbarItem
                            selected={pathname === '/trips'}
                            onClick={
                                () =>
                                    pathname !== '/trips' && this.props.history.push('/trips')
                            }
                        >
                            <Icon28Newsfeed/>
                        </TabbarItem>
                    </Tabbar>
                }
            />
        );
    }
}

export default withRouter(Footer);
