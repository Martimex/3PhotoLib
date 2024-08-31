<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import LikedPhotosActionPanel from '@/components/Panels/LikedPhotosActionPanel.vue';
import LikedPhotosEditPanel from '@/components/Panels/LikedPhotosEditPanel.vue';
import type PhotoResponseModel from '@/types/responseModel_photo';

/* definePageMeta({
    middleware: 'fetch-liked-photos'
}) */


const sStore = useStatusStore();

const { currentUser_get, likedPhotos_set, likedPhotos_update } = useAuthStore();
const { isRequestPending, likedPhotos_isEditModeOn } = storeToRefs(sStore);
const { likedPhotos_setEditMode, photosToRemoveArray_reset } = useStatusStore();
const { photoIdToUnlike_set, photoIdToUnlike_get } = usePhotoStore();

const userLikedPhotos = ref(currentUser_get()?.likedPhotos);
const LIKED_PHOTOS_MAX = 100;

function handleCurrentPhotosUpdate(deletedPhotos: PhotoResponseModel[]) {
    likedPhotos_update('remove', deletedPhotos);
    userLikedPhotos.value = currentUser_get()?.likedPhotos;
    console.log('My liked photos - UPDATED : ', userLikedPhotos.value);
}

watch(userLikedPhotos, () => {
    likedPhotos_set(userLikedPhotos.value);
})

onBeforeMount(() => {
    console.log('TO UNLIKE:: ', photoIdToUnlike_get());
})

onMounted(() => {
   // isRequestPending.value = false;
    console.log('My liked photos: ', userLikedPhotos.value);
})

onUnmounted(() => {
    photoIdToUnlike_set(null);
    likedPhotos_setEditMode(false);
    photosToRemoveArray_reset();
})

</script>

<template>
    <NavigationBar />

    <section class="min-h-screen my-12 mx-4">
        <h1 class="text-4xl font-bold mb-6"> Liked photos </h1>
        <p class="py-3"> This page contains all the photos liked by you. It is a supercollection, meaning you can store up to 100 of your favourite photos. </p>
        <p class="py-3"> You are able to manage your liked photo collection at any time inside this panel. </p>
        <div class="flex items-center justify-start w-fit py-6 px-4 my-6 border-black rounded-md border-2">
            <FontAwesomeIcon :icon="faHeart" class="text-5xl text-red-500 mr-4"></FontAwesomeIcon>
            <h2 class="text-4xl font-semibold"> {{ userLikedPhotos.length }} / {{ LIKED_PHOTOS_MAX }} </h2>
        </div>

        <Transition> 
            <div v-if="isRequestPending"> <Loading /> </div>
            <div v-else-if="!userLikedPhotos.length"> <NoResults /> </div>
            <div v-else-if="userLikedPhotos">
                <div v-if="!isRequestPending" class="">
                    <!-- Slicing works well for providers API, which reqire minimal response photos, while this app does not  -->
                    <PhotoItem v-for="(image, index) in userLikedPhotos" :key="image.id" :imgData="image.photoDetails" :provider="image.provider" />
                </div>
                <div v-if="isRequestPending" class="">
                    <p class="text-2xl bold text-yellow-400"> Pending... Please wait 🥰</p>
                </div>
            </div>
        </Transition>

    </section>

    <LikedPhotosEditPanel v-if="likedPhotos_isEditModeOn" @photosRemove="handleCurrentPhotosUpdate"  />
    <LikedPhotosActionPanel v-else />
</template>

<style scoped>

.v-enter-active,
.v-leave-active {
    transition: opacity 400ms ease;
}
.v-enter-from,
.v-leave-to {
    opacity: 0;
}

</style>