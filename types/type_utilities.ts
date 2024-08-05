import type PexelsPhoto from "./photoItem_pexels";
import type PixabayPhoto from "./photoItem_pixabay";
import type UnsplashPhoto from "./photoItem_unsplash";

export type availablePhotoTypes = PixabayPhoto | PexelsPhoto | UnsplashPhoto;
export type availableProviderNames = 'pixabay' | 'pexels' | 'unsplash';
export function isAvailableProvider(value: string): value is availableProviderNames {
    return value === 'pixabay' || value === 'pexels' || value === 'unsplash'
}
export type numberInputKeys = {current: number, default: number, min: number, max: number};

// This is for URL validation purposes - if they URL contain a valid param, we need to identify it, and assign a variable to the
// proper state variable. This type ensures type safety
export type optionalURLParamsIdentifiers = { key: string, refersTo: string, controlValues: string, type: 'string' | 'number' };

// We use this to iteratively check if a user-provided URL value is associated with one of provider names, that is why
// it is mandatory to keep the correct values in array aswell
export const availableProviderNames_Array = <availableProviderNames[]>['pixabay', 'pexels', 'unsplash']; 

// This utility function helps dealing with TS errors regarding various PhotoProviders having different type fields, which
// are fully determined by the end API response (that obviously we do not have any control over)
export const utilizePhotoProvider = (value: availablePhotoTypes) => value as any;

// This utility controls available views that can be called in the Landing Page for log-in / register purposes
export type availableHomePageViews = 'welcome' | 'signin' | 'login' | 'verify' | 'reset' | 'new';

// This utility is for validating fields isnide the signin form
export type registrationFormProp = {text: any, isTextCorrect: any, inputElement: any, errorMsgElement: any}; // This one is non-exportable

// When we access session data, and the session is active, the user data will be fetched, controlled by this type
// LATER ON, CHANGE "ANY" TYPE FOR likedPhotos & collections AND REPLACE THEIR TYPES WITH APPROPIATE ONES
export type userData = { name: string, email: string, profileImage: string, memberSince: string, likedPhotos: any, collections: any }