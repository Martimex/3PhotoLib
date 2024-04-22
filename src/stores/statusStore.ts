import { defineStore } from "pinia";
import { ref } from 'vue';

export const useStatusStore = defineStore(`statusStore`, () => {
    const isSearchbarOpen = ref<boolean>(false);
    const isAdvancedMenuOpen = ref<boolean>(false);
    const isRequestPending = ref<boolean>(false);
    const isFullScreenPhotoView = ref<boolean>(false);

    return { isSearchbarOpen, isAdvancedMenuOpen, isRequestPending, isFullScreenPhotoView }
});