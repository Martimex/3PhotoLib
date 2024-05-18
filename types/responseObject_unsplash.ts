import type UnsplashPhoto from "./photoItem_unsplash";

export default interface UnsplashResponseObject {
    total: number,
    total_pages: number,
    results: UnsplashPhoto[] | []
}