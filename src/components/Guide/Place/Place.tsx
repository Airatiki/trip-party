import { IProps, IState } from "./types";

import React, { Component } from 'react';


class Place extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    public render() {
        return(
            <div>
                {this.props.name}
            </div>
        );
    }
}

export default Place;
