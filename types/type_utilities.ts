import type CollectionResponseModel from "./responseModel_collection";
import type PexelsPhoto from "./photoItem_pexels";
import type PixabayPhoto from "./photoItem_pixabay";
import type UnsplashPhoto from "./photoItem_unsplash";

export type availablePhotoTypes = PixabayPhoto | PexelsPhoto | UnsplashPhoto;
export type availableProviderNames = 'pixabay' | 'pexels' | 'unsplash';
export type availablePhotoStorages = 'liked' | 'collection';
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
export type userData = { id: string, name: string, email: string, profileImage: string, memberSince: string, likedPhotos: any, collections: any }

// Used to safe type account limitation variables and values
export type accountLimitationsData = { COLLECTIONS_LIMIT: number, PHOTOS_IN_COLLECTION_LIMIT: number, LIKED_PHOTOS_LIMIT: number, USERACCOUNT_RANDOMLIKEDPHOTOSVIEWED_LIMIT: number, USERACCOUNT_RANDOMCOLLECTIONSVIEWED_LIMIT: number, }

export type requestParamsObject = {queryText: string, currPhotoProviderName: availableProviderNames, outputPhotosNumber: number, searchPageCount: number }

export type requestDependenciesObject = {queryText: string, currPhotoProvider: any, outputPhotosNumber: number, searchPageCount: number }

export type requestOptionsObject = {isRequestPending: boolean,  pageModifier: number }

// Used for randomizing viewable category inside /home
export const featuredCategories = ['garden', 'landscape', 'girl', 'moon', 'dog', 'boy', 'sunset', 'nebula', 'cars', 'city', 'neon', 'people', 'winter', 'summer', 'cat'] as const;
export type AllFeaturedCategories = typeof featuredCategories[number];

// Used for SaveOrMoveToCollection to set fetched collections to their respective statuses (states)
export type collectionStates = {
	base: CollectionResponseModel[],
	moveFrom: CollectionResponseModel[],
	addOrMoveTo: CollectionResponseModel[],
	maxPhotos: CollectionResponseModel[],
	hasThatPhoto: CollectionResponseModel[]
}

// Used to properly type keys for User Account tabs for random LikedPhotos and Collections
export type randomlyPickedObj = {
	likedPhotos: any,
	collections: any,
}

// Used for determining collection folders statuses (full, hasThePhoto, etc.)
export type collectionStatesKeys = keyof collectionStates;

// Also used for determining collection folders statuses (full, hasThePhoto, etc.)
export type collectionStateCheckObject = {
    collection_viewed: CollectionResponseModel | null,
    image_targetID: string,
    limit_photosInCollection: number
}

// Used to provide better type safety for only Photo ID's in Collections (ordered)
export type orderedCollectionsPhotoIDs = {
    [key: `${string}`]: string[],
}