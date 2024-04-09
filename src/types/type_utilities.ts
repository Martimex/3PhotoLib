import type PexelsPhoto from "./photoItem_pexels"
import type PixabayPhoto from "./photoItem_pixabay"

// This utility function helps dealing with TS errors regarding various PhotoProviders having different type fields, which
// are fully determined by the end API response (that obviously we do not have any control over)
export const utilizePhotoProvider = (value: PixabayPhoto | PexelsPhoto) => value as any;