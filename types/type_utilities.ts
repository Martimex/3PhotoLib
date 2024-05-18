import type PexelsPhoto from "./photoItem_pexels";
import type PixabayPhoto from "./photoItem_pixabay";
import type UnsplashPhoto from "./photoItem_unsplash";

export type availablePhotoTypes = PixabayPhoto | PexelsPhoto | UnsplashPhoto;
export type availableProviderNames = 'pixabay' | 'pexels' | 'unsplash';
export type numberInputKeys = {current: number, default: number, min: number, max: number};

// This utility function helps dealing with TS errors regarding various PhotoProviders having different type fields, which
// are fully determined by the end API response (that obviously we do not have any control over)
export const utilizePhotoProvider = (value: availablePhotoTypes) => value as any;