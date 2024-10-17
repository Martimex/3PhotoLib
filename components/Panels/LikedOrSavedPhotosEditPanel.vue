<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import type PhotoResponseModel from '@/types/responseModel_photo';
import type { availablePhotoStorages } from '~/types/type_utilities';

const { collectionsOrlikedPhotos_setEditMode, photosToRemoveArray_get, photosToRemoveArray_reset } = useStatusStore();
const { currentUser_get } = useAuthStore();
const { viewedCollection_get } = useCollectionStore();

const collectionsOrlikedPhotosEmits = defineEmits(['photosRemove']);

const props = defineProps<{
    storageType: availablePhotoStorages,
}>();

const userLikedPhotos = ref(currentUser_get()?.likedPhotos);

function handleCloseEditMode() {
    collectionsOrlikedPhotos_setEditMode(false);
    photosToRemoveArray_reset();
}

async function handlePhotosDeletion() {

    // We will call the endpoint to remove many items from the db

    const photosToBeRemoved = sortById(photosToRemoveArray_get()) as PhotoResponseModel[];
    
    // If no photos are picked, then this button will work as close
    if(!photosToBeRemoved.length) { handleCloseEditMode(); return; }

    const currentUserData = currentUser_get();
    const viewedCollectionData = viewedCollection_get();

    if(!currentUserData) { throw new Error('ERROR: User data not found !')}

    if(props.storageType === 'liked') {
        await $fetch(`/photo/deleteFromLiked`, { method: 'post', body: {
            photosToRemoveArray: photosToBeRemoved,
            userData: currentUserData
        }});
    }

    else if(props.storageType === 'collection') {
        if(!viewedCollectionData) { throw new Error('ERROR: Viewed collection data not found !'); }
        await $fetch(`/photo/deleteFromCollection`, { method: 'post', body: {
            photosToRemoveArray: photosToBeRemoved,
            collectionID: viewedCollectionData.releaseId
        }});
    }



    //const userLikedPhotos_copy = [...userLikedPhotos.value];
    //photosToBeRemoved.forEach((photo, index) => userLikedPhotos_copy.splice(userLikedPhotos_copy.indexOf(photosToBeRemoved[index]), 1));
/*     const userLikedPhotos_copy = [...userLikedPhotos.value].filter(el => 
        {    
            return Boolean(!findId(el.photoId, photosToBeRemoved))
        }
    ); */

    collectionsOrlikedPhotosEmits('photosRemove', photosToBeRemoved);

    handleCloseEditMode();

    photosToRemoveArray_reset();
}

onUnmounted(() => {
    collectionsOrlikedPhotos_setEditMode(false);
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