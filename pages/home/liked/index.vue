<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import LikedPhotosActionPanel from '@/components/Panels/LikedPhotosActionPanel.vue';
import LikedOrSavedPhotosEditPanel from '~/components/Panels/LikedOrSavedPhotosEditPanel.vue';
import { getLikedPhotosLimit } from '#imports';
import type PhotoResponseModel from '@/types/responseModel_photo';
import type { availablePhotoStorages } from '~/types/type_utilities';

const sStore = useStatusStore();

const { currentUser_get, likedPhotos_set, likedPhotos_update } = useAuthStore();
const { isRequestPending, collectionsOrlikedPhotos_isEditModeOn, currentBreakpoint } = storeToRefs(sStore);
const { currPhotoProviderName } = useSearchQueryStore();
const { collectionsOrlikedPhotos_setEditMode, photosToRemoveArray_reset } = useStatusStore();
const { photoIdToUnlike_set, photoIdToUnlike_get } = usePhotoStore();

const userLikedPhotos = ref(currentUser_get()?.likedPhotos);

const isTeleportReady = ref<boolean>(false);
const likedPhotosContainerElement = ref();
const navBarElement = ref();

// Used to determine if page content requires a Y-scrollbar to be used 
const isContentOverflow = ref<boolean>(false);

function handleCurrentPhotosUpdate(deletedPhotos: PhotoResponseModel[]) {
    likedPhotos_update('remove', deletedPhotos);
    userLikedPhotos.value = currentUser_get()?.likedPhotos;
}

function testContentOverflow(): boolean {
    const [likedPhotosContainerHeight, navbarHeight] = [
        likedPhotosContainerElement?.value?.scrollHeight || 0,
        navBarElement?.value.navBarContainerRef.offsetHeight || 0
    ];
    if((document.body.scrollHeight + likedPhotosContainerHeight + navbarHeight) > window.screen.height) return true;
    if(document.body.scrollHeight + navbarHeight < window.screen.height) return false;
    if(userLikedPhotos.value.length) return true;
    return false;
}

watch(userLikedPhotos, () => {
    isContentOverflow.value = testContentOverflow();
})

onMounted(() => {
    isTeleportReady.value = true; 
    isContentOverflow.value = testContentOverflow(); 
})

onUpdated(() => {
    isContentOverflow.value = testContentOverflow();
})

onUnmounted(() => {
    photoIdToUnlike_set(null);
    collectionsOrlikedPhotos_setEditMode(false);
    photosToRemoveArray_reset();
})

// Used for <Teleport> functionality
const checkTeleportConditions = computed(() => { return testTeleportConditions(currentBreakpoint.value, isTeleportReady.value); })

</script>

<template>
    <NavigationBar ref="navBarElement" />

    <section class="my-12 mx-4 min-h-fit" :class="isContentOverflow && `min-h-screen`">
        <section class="mx-[5vw] mb-3 text-center">
            <h1 class="text-4xl font-bold mb-8 break-words leading-12 max-w-screen"> Liked photos </h1>
            <p class="py-3 text-base"> This page contains all the photos liked by you. It is a supercollection, meaning you can store up to 100 of your favourite photos. </p>
            <p class="py-3 text-base"> You are able to manage your liked photo collection at any time inside this panel. </p>
        </section>

        <section class="grid grid-rows-1 grid-cols-[1fr_auto_1fr] items-center">
            <div class="bg-black h-[0.15rem] mr-3 shadow-xl shadow-black"></div>
            <div class="w-fit mt-6 mb-8 mx-auto border-black rounded-md border-2">
                <div v-if="userLikedPhotos.length" class="flex items-center justify-start py-6 px-4">
                    <FontAwesomeIcon :icon="faHeart" class="text-4xl text-red-500 mr-4 drop-shadow-[0rem_0rem_0.20rem_#ef4444]"></FontAwesomeIcon>
                    <h2 class="text-3xl font-semibold ml-3"> {{ userLikedPhotos.length }} / {{ getLikedPhotosLimit() }} </h2>
                </div>
            </div>
            <div class="bg-black h-[0.15rem] ml-3 shadow-xl shadow-black"></div>
        </section>

        <Transition> 
            <div v-if="isRequestPending"> <Loading /> </div>
            <div v-else-if="!userLikedPhotos.length"> <EmptyResponsesNoLikedPhotos /> </div>
            <div v-else-if="userLikedPhotos">
                <div v-if="!isRequestPending" ref="likedPhotosContainerElement" class="">
                    <ResultPhotosContainer :photosArray="userLikedPhotos" :providerName="currPhotoProviderName" />
                </div>
                <div v-if="isRequestPending" class="">
                    <p class="text-2xl bold text-yellow-400"> Pending... Please wait 🥰</p>
                </div>
            </div>
        </Transition>

    </section>

    <Teleport to="#top-panel-teleport" v-if="checkTeleportConditions" >
        <div>
            <LikedOrSavedPhotosEditPanel v-if="collectionsOrlikedPhotos_isEditModeOn" :isContentOverflow="isContentOverflow" storageType="liked" @photosRemove="handleCurrentPhotosUpdate"  
                :class="getTeleportedPanelClasses()" :disable-blur="true"
            />
            <LikedPhotosActionPanel v-else :isContentOverflow="isContentOverflow" 
                :class="getTeleportedPanelClasses()" :disable-blur="true"
            />
        </div>
    </Teleport>

    <div v-else>
        <LikedOrSavedPhotosEditPanel v-if="collectionsOrlikedPhotos_isEditModeOn" :isContentOverflow="isContentOverflow" storageType="liked" @photosRemove="handleCurrentPhotosUpdate"  />
        <LikedPhotosActionPanel v-else :isContentOverflow="isContentOverflow" />
    </div>

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