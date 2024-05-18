import type PixabayPhoto from "./photoItem_pixabay";

export default interface PixabayResponseObject {
    total: number,
    totalHits: number,
    hits: PixabayPhoto[] | []
}