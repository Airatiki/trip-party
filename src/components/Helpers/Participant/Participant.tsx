import { IProps } from './types';

import React, { Component } from 'react';

import Display from './Display';
import Form from './Form';


class Participant extends Component<IProps> {
    public render() {
        return(
            <div style={{marginTop: '5px', marginBottom: '5px'}}>
                {
                    this.props.isForm ?
                        <Form
                            participant={this.props.participant}
                            occasionAuthorId={this.props.occasionAuthorId}
                        />
                    :
                        <Display
                            participant={this.props.participant}
                            occasionAuthorId={this.props.occasionAuthorId}
                        />
                }
            </div>
        );
    }
}

export default Participant;
