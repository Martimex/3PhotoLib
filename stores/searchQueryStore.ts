import PhotoProvider from '@/providers/photoProvidersInitializer';
import type { availableProviderNames, optionalURLParamsIdentifiers, numberInputKeys, cachedQueryResponsePhotos } from '@/types/type_utilities';

export const useSearchQueryStore = defineStore(`searchQueryStore`, () => {
    const DEFAULT_PROVIDER: availableProviderNames = 'pixabay';

    const queryText = ref<string>('');
    const currPhotoProviderName = ref<availableProviderNames>(`${DEFAULT_PROVIDER}`);
    const currPhotoProvider = ref(new PhotoProvider('pixabay').setCurrentProvider());
    const outputPhotosObj = ref<numberInputKeys>({current: 10, default: 10, min: 1, max: 25});
    const outputPhotosNumber = ref<number>(10);
    const searchPageObj = ref<numberInputKeys>({current: 1, default: 1, min: 1, max: 999});
    const searchPageCount = ref<number>(1);

    // Not a ref, since we just save some photos data based on query parameters and its results
    const cachedResults = ref<cachedQueryResponsePhotos>({
        "pixabay": { },
        "pexels": { },
        "unsplash": { }
    });
    
    // Not a ref, because that is a static key, which is not meant to be modified
    const availableOptionalParams: optionalURLParamsIdentifiers[] = [
        {key: 'page', refersTo: 'searchPageCount', controlValues: 'searchPageObj', type: 'number'}, 
        {key: 'photos', refersTo: 'outputPhotosNumber', controlValues: 'outputPhotosObj', type: 'number'},
        {key: 'provider', refersTo: 'currPhotoProviderName', controlValues: '', type: 'string'}
    ];

    function $reset() {
        queryText.value = '';
        currPhotoProviderName.value = `${DEFAULT_PROVIDER}`;
        currPhotoProvider.value = new PhotoProvider(`${DEFAULT_PROVIDER}`).setCurrentProvider();
        outputPhotosObj.value = {current: 10, default: 10, min: 1, max: 25};
        outputPhotosNumber.value = 10;
        searchPageObj.value = {current: 1, default: 1, min: 1, max: 999};
        searchPageCount.value = 1;
    }

    return { queryText, currPhotoProviderName, currPhotoProvider, outputPhotosObj, outputPhotosNumber, searchPageObj, searchPageCount, availableOptionalParams, cachedResults, $reset }
});