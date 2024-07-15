import type { availableHomePageViews } from "~/types/type_utilities";

export const useStatusStore = defineStore(`statusStore`, () => {
    const isSearchbarOpen = ref<boolean>(false);
    const isAdvancedMenuOpen = ref<boolean>(false);
    const isRequestPending = ref<boolean>(false);
    const isFullScreenPhotoView = ref<boolean>(false);
    const currentHomePageView = ref<availableHomePageViews>('welcome');
    const homePageViewsHierarchy = ref<availableHomePageViews[]>(['welcome']);

    function setCurrentHomePageView(hpView: availableHomePageViews) {
        currentHomePageView.value = hpView;
    }

    function addHomePageViewHierarchy(pView: availableHomePageViews) {
        homePageViewsHierarchy.value.push(pView);
    }

    function removeHomePageViewHierarchy() {
        if(homePageViewsHierarchy.value.length > 1) {
            homePageViewsHierarchy.value.pop();
        }
    }

    function resetHomePageViewHierarchy() {
        while(homePageViewsHierarchy.value.length > 1) {
            homePageViewsHierarchy.value.pop();
        }
    }

    return { isSearchbarOpen, isAdvancedMenuOpen, isRequestPending, isFullScreenPhotoView, currentHomePageView, setCurrentHomePageView, homePageViewsHierarchy, addHomePageViewHierarchy, removeHomePageViewHierarchy, resetHomePageViewHierarchy }
});