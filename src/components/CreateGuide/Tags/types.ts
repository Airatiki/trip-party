import { TAGS } from "api/guides/constants";


export interface IProps {
    addedTags: TAGS[];
    onChange(tags: TAGS[]): void;
}
