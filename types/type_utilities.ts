import type PexelsPhoto from "./photoItem_pexels";
import type PixabayPhoto from "./photoItem_pixabay";
import type UnsplashPhoto from "./photoItem_unsplash";

export type availablePhotoTypes = PixabayPhoto | PexelsPhoto | UnsplashPhoto;
export type availableProviderNames = 'pixabay' | 'pexels' | 'unsplash';
export type numberInputKeys = {current: number, default: number, min: number, max: number};

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
/* export type registrationForm = { username: registrationFormProp, email: registrationFormProp, password: registrationFormProp, isTOSAccepted: registrationFormProp} 
 */