import { defineStore } from 'pinia';
import { ref } from 'vue';
import PhotoProvider from '@/providers/photoProvidersInitializer';
import type { availableProviderNames } from '@/types/type_utilities';

export const useSearchQueryStore = defineStore(`searchQueryStore`, () => {
    const queryText = ref('');
    const currPhotoProviderName = ref<availableProviderNames>('pixabay');
    const currPhotoProvider = ref(new PhotoProvider('pixabay').setCurrentProvider());
    const outputPhotosObj = ref({current: 10, default: 10, min: 1, max: 25});
    const outputPhotosNumber = ref(10);
    const searchPageObj = ref({current: 1, default: 1, min: 1, max: 999});
    const searchPageCount = ref(1);

    return { queryText, currPhotoProviderName, currPhotoProvider, outputPhotosObj, outputPhotosNumber, searchPageObj, searchPageCount }
});