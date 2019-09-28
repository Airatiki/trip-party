import { IProps, IState } from "./types";

import React, { Component, Fragment } from 'react';
import { Cell, List, Separator } from "@vkontakte/vkui";
import LeafletMap from "../../Helpers/LeafletMap";


class Place extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    public render() {
        return(
            <List>
                <Cell
                    onClick={
                        () =>
                            this.setState({isOpen: !this.state.isOpen})
                    }
                >
                    {this.props.name}
                </Cell>
                {
                    this.state.isOpen &&
                    <Fragment>
                        <Separator/>
                        <Cell multiline={true}>
                            {this.props.description}
                        </Cell>
                        <Cell>
                            <LeafletMap lat={'10'} lng={'10'}/>
                        </Cell>
                    </Fragment>
                }
            </List>
        );
    }
}

export default Place;
