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
    isContentOverflow: boolean
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
    <nav class="bottom-0 left-0 right-0 backdrop-blur bg-[#fff5] text-[#333] py-5 flex justify-around items-center" :class="props.isContentOverflow? `sticky` : `fixed`" >
        <FontAwesomeIcon :icon="faXmark" class="text-3xl text-red-600 font-bold drop-shadow-[0rem_0rem_0.05rem_#222]" @click="handleCloseEditMode"></FontAwesomeIcon>
        <p class="text-[#222] text-center px-6 min-w-20 text-2xl font-bold drop-shadow-[0rem_0rem_0.05rem_#eee]"> {{ photosToRemoveArray_get().length }} </p>
        <FontAwesomeIcon :icon="faCheck" class="text-3xl text-green-600 font-bold drop-shadow-[0rem_0rem_0.05rem_#222]" @click="handlePhotosDeletion"></FontAwesomeIcon>
    </nav>
</template>

<style scoped>

</style>