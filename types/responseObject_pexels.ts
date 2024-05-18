import type PexelsPhoto from "./photoItem_pexels";

export default interface PexelsResponseObject {
    total_results: number,
    page: number,
    per_page: number,
    photos: PexelsPhoto[] | [],
    prev_page?: string,
    next_page?: string,
}