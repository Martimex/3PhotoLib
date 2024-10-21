import type CollectionResponseModel from "~/types/responseModel_collection";

export const useCollectionStore = defineStore(`collectionsStore`, () => {
    const viewedCollection = ref<CollectionResponseModel | null>(null);

    const viewedCollection_get = function() { return viewedCollection.value; }
    const viewedCollection_set = function(collectionToView: CollectionResponseModel | null) { viewedCollection.value = collectionToView; }

    return { viewedCollection_get, viewedCollection_set, viewedCollection };
});