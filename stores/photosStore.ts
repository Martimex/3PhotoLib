import type { availablePhotoTypes } from "~/types/type_utilities";

export const usePhotoStore = defineStore(`photosStore`, () => {
    const storedPhotos = ref([]);
    const viewedPhoto = ref<availablePhotoTypes>();
    const photoIdToUnlike = ref<string | null>(null);

    const photoIdToUnlike_set = function(photoId: string | null): void {
        photoIdToUnlike.value = photoId;
    }

    const photoIdToUnlike_get = function(): string | null {
        return photoIdToUnlike?.value;
    }
    

    return { storedPhotos, viewedPhoto, photoIdToUnlike_set, photoIdToUnlike_get };
});