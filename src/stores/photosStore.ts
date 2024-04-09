import { defineStore } from "pinia";
import { ref } from "vue";

export const usePhotoStore = defineStore(`photosStore`, () => {
    const storedPhotos = ref([]);

    return { storedPhotos };
});