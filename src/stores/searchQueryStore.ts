import { defineStore } from 'pinia';
import { ref } from 'vue';
import PhotoProvider from '@/providers/photoProvidersInitializer';

export const useSearchQueryStore = defineStore(`searchQueryStore`, () => {
    const queryText = ref('');
    const currPhotoProvider = ref(new PhotoProvider('pixabay').setCurrentProvider());
    const outputPhotosCount = ref(10);
    const searchPageNumber = ref(1);

    return { queryText, currPhotoProvider, outputPhotosCount, searchPageNumber }
});