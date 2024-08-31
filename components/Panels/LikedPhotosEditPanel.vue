<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import type PhotoResponseModel from '@/types/responseModel_photo';

const { likedPhotos_setEditMode, photosToRemoveArray_get, photosToRemoveArray_reset } = useStatusStore();
const { currentUser_get } = useAuthStore();

const likedPhotoEmits = defineEmits(['photosRemove']);

const userLikedPhotos = ref(currentUser_get()?.likedPhotos);

function handleCloseEditMode() {
    likedPhotos_setEditMode(false);
    photosToRemoveArray_reset();
}

async function handlePhotosDeletion() {

    // We will call the endpoint to remove many items from the db

    const photosToBeRemoved = sortById(photosToRemoveArray_get()) as PhotoResponseModel[];
    
    // If no photos are picked, then this button will work as close
    if(!photosToBeRemoved.length) { handleCloseEditMode(); return; }

    const currentUserData = currentUser_get();

    if(!currentUserData) { throw new Error('ERROR: User data not found !')}

    await $fetch(`/photo/delete`, { method: 'post', body: {
        photosToRemoveArray: photosToBeRemoved,
        userData: currentUserData
    }});

    //const userLikedPhotos_copy = [...userLikedPhotos.value];
    //photosToBeRemoved.forEach((photo, index) => userLikedPhotos_copy.splice(userLikedPhotos_copy.indexOf(photosToBeRemoved[index]), 1));
/*     const userLikedPhotos_copy = [...userLikedPhotos.value].filter(el => 
        {    
            return Boolean(!findId(el.photoId, photosToBeRemoved))
        }
    ); */

    likedPhotoEmits('photosRemove', photosToBeRemoved);

    handleCloseEditMode();

    photosToRemoveArray_reset();
}

onUnmounted(() => {
    likedPhotos_setEditMode(false);
})


</script>

<template>
    <nav class="sticky bottom-0 left-0 right-0 text-black py-7 bg-gray-200 flex justify-around items-center">
        <FontAwesomeIcon :icon="faXmark" class="text-4xl text-red-500 font-bold" @click="handleCloseEditMode"></FontAwesomeIcon>
        <p class="text-black block px-6 min-w-20 text-4xl font-bold"> {{ photosToRemoveArray_get().length }} </p>
        <FontAwesomeIcon :icon="faCheck" class="text-4xl text-green-500 font-bold" @click="handlePhotosDeletion"></FontAwesomeIcon>
    </nav>
</template>

<style scoped>

</style>