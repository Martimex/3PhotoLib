<script setup lang="ts">
import { utilizePhotoProvider } from '../types/type_utilities';
import type PixabayPhoto from '../types/photoItem_pixabay';
import type PexelsPhoto from '../types/photoItem_pexels';
import PhotoPanel from './PhotoPanel.vue';
import { useStatusStore } from '@/stores/statusStore';
import { useSearchQueryStore } from '@/stores/searchQueryStore';
import { computed, ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import type { availablePhotoTypes, availableProviderNames } from '../types/type_utilities';
import type CollectionResponseModel from '~/types/responseModel_collection';
import PhotoProvider from '@/providers/photoProvidersInitializer';
import requestImagePhoto from '~/composables/requestImagePhoto';
import likeThePhoto from '@/composables/likeThePhoto';
import keepPhotoAsUnliked from '@/composables/keepPhotoAsUnliked';
import handlePhotoDownload from '~/composables/handlePhotoDownload';

const sqStore = useSearchQueryStore();
const sStore = useStatusStore();
const { photosToRemoveArray_modify, isAddToNewCollectionTextActive_set } = useStatusStore();
const { collectionsOrlikedPhotos_isEditModeOn } = storeToRefs(sStore);
const { currPhotoProvider } = storeToRefs(sqStore);
const { likedPhotosOrdered_get, collections_add } = useAuthStore();
const { photoIdToUnlike_get, photoIdToUnlike_set } = usePhotoStore();
const { collectionsToAddPhoto } = useTemporalStore();
const { viewedCollection_get, viewedCollection_set } = useCollectionStore();
const { viewedCollection } = storeToRefs(useCollectionStore());

const props = defineProps<{
    imgData: availablePhotoTypes,
    provider: availableProviderNames
}>();

const isPhotoLiked = ref<boolean>(false);
const isPhotoRecentlyAddedToCollection = ref<boolean>(false);
const isPhotoDownloaded = ref<boolean>(false);

const isPhotoToRemove = ref<boolean>(false);
const imgRef = ref<HTMLImageElement>();
const isImgLoaded = ref<boolean>(false);
const isPhotoPanelOpen = ref<boolean>(false);
const providerObj = new PhotoProvider(props.provider).setCurrentProvider();
const anchorRef = ref<HTMLAnchorElement>();

const testIfInsideCollection = computed(() => {
    // By checking if viewed collection is present, we may know if the photo Item is clicked from /collections/[id] endpoint or not
    return viewedCollection_get()? true : false;
})

const isSaveToCollectionModalOpen = ref<boolean>(false);
    const closeSaveToCollectionModal = () => { collectionsToAddPhoto.reset(); isSaveToCollectionModalOpen.value = false; }
    const openSaveToCollectionModal = () => isSaveToCollectionModalOpen.value = true;

const isAddCollectionModalOpen = ref<boolean>(false);
    const closeAddCollectionModal = () => isAddCollectionModalOpen.value = false;
    const openAddCollectionModal = () => isAddCollectionModalOpen.value = true;

function handleImgLoadded() {
    isImgLoaded.value = true;
}

onBeforeMount(() => {
    isPhotoLiked.value = findId(`${props.provider}=${props.imgData.id}`, likedPhotosOrdered_get());
    const unlikedPhotoId = photoIdToUnlike_get();
    if(unlikedPhotoId !== null) {
        isPhotoToRemove.value = Boolean(unlikedPhotoId === `${props.provider}=${props.imgData.id}`);
    }
})


onMounted(() => {
    if(imgRef?.value?.complete) {
        handleImgLoadded();
    } else {
        imgRef?.value?.addEventListener('load', handleImgLoadded);
    }
});

onUnmounted(() => {
    isPhotoToRemove.value = false;
})

watch(collectionsOrlikedPhotos_isEditModeOn, () => {

    isPhotoPanelOpen.value = false;

    if(!collectionsOrlikedPhotos_isEditModeOn.value) {
        isPhotoToRemove.value = false;
    }
});

/* watch(collections_isEditModeOn, () => {

    isPhotoPanelOpen.value = false;

    if(!collections_isEditModeOn.value) {
        isPhotoToRemove.value = false;
    }
})
 */
//const photoData = computed(() => props.imgData);

const getBgImg = function() {
    return `url(${providerObj?.getLowResImageURL(utilizePhotoProvider(props.imgData))})`
    //return `url(${photoData.value.previewURL})`
}

const handleFullScreenPhotoView = function(ev: Event) {

    //ev.stopPropagation();
    const targetElement = ev.target as HTMLDivElement;

    if(!isImgLoaded.value) return;
    if(targetElement.dataset && targetElement.dataset['role'] === 'panel') return;
    isPhotoPanelOpen.value = !isPhotoPanelOpen.value;
}

const checkIfPhotoToRemove = function() {
    if(!collectionsOrlikedPhotos_isEditModeOn.value) return;
    isPhotoToRemove.value = !isPhotoToRemove.value;
    //photoEmit('photosToDeleteCount', isPhotoToRemove.value);
    photosToRemoveArray_modify({id: '', provider: props.provider, photoId: `${props.provider}=${props.imgData.id}`, photoDetails: props.imgData});
}

/* function handlePhotoDislike(photoID: string) {
    keepPhotoAsUnliked(isPhotoLiked, photoID);
    isPhotoToRemove.value = true;
}

function handlePhotoLike() {
    likeThePhoto(isPhotoLiked);
} */

function handlePhotoLikedToggle() {
    if(isPhotoLiked.value === true) { isPhotoToRemove.value = true; }
    handleLikePhoto({isPhotoLiked: isPhotoLiked.value, imgData: props.imgData, provider: props.provider}, isPhotoLiked);
}

function handleAddCollection(newCollection: CollectionResponseModel) {
    // This function only happens when user adds a collection by a blue text "Add to new collection" (inside SaveOrMoveToCollection)
    collections_add(newCollection);
    collectionsToAddPhoto.addNew(newCollection);
    isAddToNewCollectionTextActive_set(false);
}

function handleConfirmAddToCollection() {
    isPhotoRecentlyAddedToCollection.value = true;
}

function handleConfirmMoveToAnotherCollection(collectionWithoutMovedPhoto: CollectionResponseModel) {
    viewedCollection_set(collectionWithoutMovedPhoto);
}

</script>

<template>
    <div @click="[handleFullScreenPhotoView($event), checkIfPhotoToRemove()]" :class="{ loaded: isImgLoaded }"  class="blur-bg relative flex justify-center bg-cover bg-center mx-2 my-4 min-w-[80vw] max-w-[90vw] min-h-[20vh] rounded-md shadow-md shadow-black transition-opacity
        sm:min-w-0 sm:max-w-[100%] sm:my-2 sm:mx-0
    ">
        <img ref="imgRef" @error="requestImagePhoto($event, props.provider, `${props.imgData.id}`)" :src="providerObj?.getHighResImageURL(utilizePhotoProvider(props.imgData))" :width="providerObj?.getPhotoWidth(utilizePhotoProvider(props.imgData))" :height="providerObj?.getPhotoHeight(utilizePhotoProvider(props.imgData))" loading="lazy" class="min-h-[44vh] max-h-[66vh] object-cover object-center transition-opacity rounded-md
            sm:max-w-[100%] sm:max-h-[80vh]
        " />    
        <a ref="anchorRef" href="" :download="`${props.provider}=${props.imgData.id}.png`" class="absolute"></a>
        <PhotoPanel v-if="Boolean(isPhotoPanelOpen && !collectionsOrlikedPhotos_isEditModeOn)"  
            :imgData="props.imgData" :provider="props.provider" :isPhotoLiked="isPhotoLiked" :isNowAddedToCollection="isPhotoRecentlyAddedToCollection" :isPhotoDownloaded="isPhotoDownloaded"
            @photoLikedToggle="handlePhotoLikedToggle"
            @photoDownload="async() => isPhotoDownloaded = await handlePhotoDownload(anchorRef, props.provider, props.imgData)"
            @modalOpen="openSaveToCollectionModal"
        />
        <PhotoRemoveLayer v-if="Boolean((collectionsOrlikedPhotos_isEditModeOn) && isPhotoToRemove)" />
    </div>

    <ModalsSaveOrMoveToCollection v-if="isSaveToCollectionModalOpen" 
        :isMoveToMode="testIfInsideCollection" :imgData="props.imgData" :provider="props.provider"
        @modalClose="closeSaveToCollectionModal" 
        @addCollectionModalOpen="openAddCollectionModal"
        @confirmAddedToCollection="handleConfirmAddToCollection"
        @confirmMoveToAnotherCollection="handleConfirmMoveToAnotherCollection"
    />

    <ModalsAddOrEditCollection v-if="isAddCollectionModalOpen"
        :isEditMode="false"
        @add="handleAddCollection" 
        @modalClose="closeAddCollectionModal"
    />

</template>


<style scoped>

    @keyframes loadPulse {
        0% {
            background-color: #fff2;
        }

        100% {
            background-color: #fff4;
        }
    }

    .blur-bg {
        background-image: v-bind(getBgImg());
    }

    .blur-bg::before {
        content: '';
        position: absolute;
        inset: 0;
        animation: loadPulse 1.25s linear infinite alternate;
    }

    .blur-bg.loaded::before {
        content: none;
    }

    img {
        opacity: 0;
        transition: opacity 300ms ease-in-out;
    }

    .loaded img {
        opacity: 1;

    }
</style>