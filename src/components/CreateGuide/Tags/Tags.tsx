import { IProps } from "./types";

import React, { Fragment, Component } from 'react';
import { Checkbox } from "@vkontakte/vkui";

import { TAGS } from "api/guides/constants";


class Tags extends Component<IProps> {
    public onChange = (tag: TAGS) => {
        const {addedTags} = this.props;
        const isInside = addedTags.indexOf(tag) !== -1;

        if (isInside) {
            this.props.onChange(
                addedTags.filter((addedTag) => addedTag !== tag)
            );
        } else {
            this.props.onChange([
                tag,
                ...addedTags,
            ]);
        }
    };

    public render() {
        return(
            <Fragment>
                {
                    Object.keys(TAGS).map(
                        (tag: TAGS) =>
                            <Checkbox
                                key={tag}
                                defaultChecked={this.props.addedTags.indexOf(tag) !== -1}
                                onChange={() => this.onChange(tag)}
                            >
                                <span className='text-white'>
                                    {TAGS[tag]}
                                </span>
                            </Checkbox>
                    )
                }
            </Fragment>
        );
    }
}

export default Tags;
