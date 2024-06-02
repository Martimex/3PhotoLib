import type { availablePhotoTypes } from "~/types/type_utilities";

export const usePhotoStore = defineStore(`photosStore`, () => {
    const storedPhotos = ref([]);
    const viewedPhoto = ref<availablePhotoTypes>();

    return { storedPhotos, viewedPhoto };
});