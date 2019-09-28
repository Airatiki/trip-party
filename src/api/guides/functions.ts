import { IGuide, IToPostLike } from "./types/instance";


export function setLike(guides: IGuide[], data: IToPostLike) {
    const guide = guides.find((guide) => guide.id === data.id);

    if (guide) {
        const ind = guides.indexOf(guide!);

        guides[ind] = {
            ...guide,
            likes: data.isLiked ? guide.likes - 1 : guide.likes + 1,
                hasBeenLiked: data.isLiked,
        };
    }
    return [...guides];
}
