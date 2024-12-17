import type { availableHomePageViews, screenSizes } from "~/types/type_utilities";
import type PhotoResponseModel from "~/types/responseModel_photo";

export const useStatusStore = defineStore(`statusStore`, () => {
    const isAsyncProcessOn = ref<boolean>(false);
    const isSearchbarOpen = ref<boolean>(false);
    const isAdvancedMenuOpen = ref<boolean>(false);
    const isRequestPending = ref<boolean>(false);
    const isFullScreenPhotoView = ref<boolean>(false);
    const currentHomePageView = ref<availableHomePageViews>('welcome');
    const homePageViewsHierarchy = ref<availableHomePageViews[]>(['welcome']);
    const photosToRemoveArray = ref<PhotoResponseModel[]>([]);
    const collectionsOrlikedPhotos_isEditModeOn = ref<boolean>(false);
    const isAddToNewCollectionTextActive = ref<boolean>(true); // Determines if blue text (Add to new collection) should be present inside SaveOrMoveToCollection (mode: Save)
    const recentlyVisitedRouteArr = ref<string[]>([]);

    const currentBreakpoint = ref<keyof screenSizes>('xs');
    
    function currentBreakpoint_set(newValue: keyof screenSizes) {
        currentBreakpoint.value = newValue;
    }

    function currentBreakpoint_get() {
        return currentBreakpoint.value;
    }

    function isAddToNewCollectionTextActive_set(newVal: boolean) {
        isAddToNewCollectionTextActive.value = newVal;
    }

    function asyncProcess_set(newVal: boolean) {
        isAsyncProcessOn.value = newVal;
    }

    function asyncProcess_get(): boolean {
        return isAsyncProcessOn.value;
    }

    function setCurrentHomePageView(hpView: availableHomePageViews) {
        currentHomePageView.value = hpView;
    }

    function addHomePageViewHierarchy(pView: availableHomePageViews) {
        homePageViewsHierarchy.value.push(pView);
    }

    function removeHomePageViewHierarchy(count = 1) {
        for(let i=0; i<count; i++) {
            if(homePageViewsHierarchy.value.length > 1) {
                homePageViewsHierarchy.value.pop();
            }
        }
    }

    function resetHomePageViewHierarchy() {
        while(homePageViewsHierarchy.value.length > 1) {
            homePageViewsHierarchy.value.pop();
        }
    }

    function photosToRemoveArray_get() {
        return photosToRemoveArray.value;
    }

    function photosToRemoveArray_modify(photoDetails: PhotoResponseModel) {
        // Checking if photoID argument is present in array - we are going to toggle this value
        const indexOfPhotoID = photosToRemoveArray.value.findIndex(el => el.photoId === photoDetails.photoId);
        if(indexOfPhotoID < 0) { photosToRemoveArray.value.push(photoDetails); }
        else { photosToRemoveArray.value = photosToRemoveArray.value.toSpliced(indexOfPhotoID, 1)  }
    }

    function photosToRemoveArray_reset() {
        photosToRemoveArray.value = [];
    }

    function collectionsOrlikedPhotos_setEditMode(newValue: boolean): void {
        collectionsOrlikedPhotos_isEditModeOn.value = newValue;
    }

/*     function collections_setEditMode(newValue: boolean): void {
        collections_isEditModeOn.value = newValue;
    }
 */
    return { isAddToNewCollectionTextActive, isAddToNewCollectionTextActive_set, isSearchbarOpen, isAdvancedMenuOpen, isRequestPending, isFullScreenPhotoView, currentHomePageView, setCurrentHomePageView, homePageViewsHierarchy, addHomePageViewHierarchy, removeHomePageViewHierarchy, resetHomePageViewHierarchy, collectionsOrlikedPhotos_isEditModeOn, recentlyVisitedRouteArr, /* collections_isEditModeOn, */ collectionsOrlikedPhotos_setEditMode, /* collections_setEditMode, */ photosToRemoveArray_get, photosToRemoveArray_modify, photosToRemoveArray_reset, asyncProcess_get, asyncProcess_set,
        currentBreakpoint, currentBreakpoint_set, currentBreakpoint_get
    }
});