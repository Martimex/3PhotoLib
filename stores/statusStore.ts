export const useStatusStore = defineStore(`statusStore`, () => {
    const isSearchbarOpen = ref<boolean>(false);
    const isAdvancedMenuOpen = ref<boolean>(false);
    const isRequestPending = ref<boolean>(false);
    const isFullScreenPhotoView = ref<boolean>(false);
    const currentHomePageView = ref<string>('welcome');

    return { isSearchbarOpen, isAdvancedMenuOpen, isRequestPending, isFullScreenPhotoView, currentHomePageView }
});