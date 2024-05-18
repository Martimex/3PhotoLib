export const usePhotoStore = defineStore(`photosStore`, () => {
    const storedPhotos = ref([]);

    return { storedPhotos };
});