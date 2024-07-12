import type { availableHomePageViews } from "~/types/type_utilities";

export const useStatusStore = defineStore(`statusStore`, () => {
    const isSearchbarOpen = ref<boolean>(false);
    const isAdvancedMenuOpen = ref<boolean>(false);
    const isRequestPending = ref<boolean>(false);
    const isFullScreenPhotoView = ref<boolean>(false);
    const currentHomePageView = ref<availableHomePageViews>('welcome');

    function setCurrentHomePageView(hpView: availableHomePageViews) {
        currentHomePageView.value = hpView;
    }

    return { isSearchbarOpen, isAdvancedMenuOpen, isRequestPending, isFullScreenPhotoView, currentHomePageView, setCurrentHomePageView }
});