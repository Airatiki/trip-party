import { IProps, IState } from "./types";

import React, { Component } from 'react';
import { Cell } from "@vkontakte/vkui";


class Place extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    public render() {
        return(
            <Cell>
                {this.props.name}
            </Cell>
        );
    }
}

export default Place;
