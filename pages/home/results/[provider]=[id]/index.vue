<script setup lang="ts">
import { useSearchQueryStore } from '@/stores/searchQueryStore';
import { usePhotoStore } from '@/stores/photosStore';
import { utilizePhotoProvider } from '~/types/type_utilities';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart, faDownload, faSave, faLink, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import handleLikePhoto from '@/composables/handleLikePhoto';
import PhotoProvider from '~/providers/photoProvidersInitializer';
import type { availablePhotoTypes } from '~/types/type_utilities';
import type CollectionResponseModel from '~/types/responseModel_collection';

const [sqStore, pStore] = [useSearchQueryStore(), usePhotoStore()];
const { likedPhotosOrdered_get, currentUser_get, collections_add } = useAuthStore();
const { isAddToNewCollectionTextActive_set } = useStatusStore();
const { currPhotoProvider } = storeToRefs(sqStore);
const { viewedPhoto } = usePhotoStore() as any;
const providerObj = new PhotoProvider(sqStore.currPhotoProviderName).setCurrentProvider();

const { collectionsToAddPhoto } = useTemporalStore();

const isPhotoLiked = ref<boolean>(false);
const isPhotoRecentlyAddedToCollection = ref<boolean>(false);
const isPhotoDownloaded = ref<boolean>(false);

const anchorRef = ref<HTMLAnchorElement>();

const isSaveToCollectionModalOpen = ref<boolean>(false);
    const closeSaveToCollectionModal = () => { collectionsToAddPhoto.reset(); isSaveToCollectionModalOpen.value = false; }
    const openSaveToCollectionModal = () => isSaveToCollectionModalOpen.value = true;

const isAddCollectionModalOpen = ref<boolean>(false);
    const closeAddCollectionModal = () => isAddCollectionModalOpen.value = false;
    const openAddCollectionModal = () => isAddCollectionModalOpen.value = true;

onBeforeMount(() => {
    isPhotoLiked.value = findId(`${sqStore.currPhotoProviderName}=${pStore.viewedPhoto?.id}`, likedPhotosOrdered_get());
})

definePageMeta({
    middleware: 'handle-single-photo-id'
})

function handlePhotoLikedToggle() {
    handleLikePhoto({isPhotoLiked: isPhotoLiked.value, imgData: viewedPhoto, provider: sqStore.currPhotoProviderName }, isPhotoLiked);
}

function handleConfirmAddToCollection() {
    isPhotoRecentlyAddedToCollection.value = true;
}

function handleAddCollection(newCollection: CollectionResponseModel) {
    // This function only happens when user adds a collection by a blue text "Add to new collection" (inside SaveOrMoveToCollection)
    collections_add(newCollection);
    collectionsToAddPhoto.addNew(newCollection);
    isAddToNewCollectionTextActive_set(false);
}

async function handlePhotoDownload() {
    if(!providerObj || !anchorRef.value) throw new Error('Failed to download the image. Please try again later');
    const res = await fetch(providerObj.getHighResImageURL(utilizePhotoProvider(viewedPhoto)))
    const blob = await res.blob();
    const href = URL.createObjectURL(blob);
    anchorRef.value.href = href;
    anchorRef.value.click();
    window.URL.revokeObjectURL(href);
    // Trigger UI update for Photo Panel
    isPhotoDownloaded.value = true;
}

const requestImagePhoto = async function(ev: Event) {
    // Pixabay is probably constantly changing IMG URL's, in which case the specific photo URL has to be reassigned with photo ID search,
    // and also appropiate DB data needs to be updated.
    const targetElement = ev.target as HTMLImageElement;

    const requestedPhoto =  providerObj?.getSinglePhotoById(utilizePhotoProvider(pStore.viewedPhoto?.id as any));
    const data = await $fetch(`${requestedPhoto}`, { headers: providerObj?.getSearchRequestHeaders() })
        .then(res => providerObj?.getSinglePhoto(utilizePhotoProvider(res as availablePhotoTypes )));

    if(!data) { throw new Error('The photo data fetch has failed'); }

    //console.error(`🪲🪲🪲 THE URL FOR LARGE IMAGE HAS ELAPSED AND THEREFORE NEEDS TO BE UPDATED. NOTE ITS DEBUG MESSAGE ONLY. ⭐⭐⭐ The provider is: `, sqStore.currPhotoProviderName);

    if(providerObj) {
        targetElement.src = providerObj?.getHighResImageURL(utilizePhotoProvider(data))
    }

    // Last of all lets update the photoDetails object (database photo record)
    await $fetch(`/photo/updateData`, { method: 'post', body: {
        photoData: data,
        photoID: `${sqStore.currPhotoProviderName}=${data.id}`
    }});
}

</script>

<template>
    <NavigationBar />
    <section class="min-h-screen text-lg">
        <section>
            <div class="relative flex justify-center">
                <a ref="anchorRef" href="" :download="`${sqStore.currPhotoProviderName}=${providerObj?.getPhotoId(viewedPhoto)}.png`" class="absolute"></a>
                <img :src="currPhotoProvider?.getHighResImageURL(utilizePhotoProvider(viewedPhoto))" @error="requestImagePhoto($event)" loading="lazy" class="my-1 w-full object-cover object-center transition-opacity rounded-md shadow-md shadow-black" />
            </div>
            <div class="grid grid-cols-4 grid-rows-1 justify-between">
                <!-- BUTTONS FUNCTIONALITY TO BE IMPLEMENTED SOON -->
                <div class="p-3 py-5 flex flex-col justify-between align-top shadow-md shadow-red-500 rounded-[10%] border-solid border-[#333] border-2 border-t-0"
                    @click="handlePhotoLikedToggle"
                >
                    <FontAwesomeIcon :icon="faHeart" class="text-2xl text-[#333]" :class="isPhotoLiked && `text-red-400 drop-shadow-[0.15rem_0.15rem_0.125rem_#ef4444]`" />
                    <span class="text-center hidden">Like</span>
                </div>
                <div class="px-3 py-5 flex flex-col justify-center align-top shadow-md shadow-green-500 rounded-[10%] border-solid border-[#333] border-2 border-t-0"
                    @click="handlePhotoDownload"
                >
                    <FontAwesomeIcon :icon="faDownload" class="text-2xl text-[#333]" :class="isPhotoDownloaded && `text-green-500 drop-shadow-[0.15rem_0.15rem_0.125rem_#4ade80]`" />
                    <span class="text-center hidden">Download</span>
                </div>
                <div class="p-3 flex flex-col justify-center align-top shadow-md shadow-blue-500 rounded-[10%] border-solid border-[#333] border-2 border-t-0">
                    <FontAwesomeIcon :icon="faLink" class="text-2xl text-[#333]" />
                    <span class="text-center hidden">Website</span>
                </div>
                <div class="p-3 flex flex-col justify-center align-top shadow-md shadow-yellow-500 rounded-[10%] border-solid border-[#333] border-2 border-t-0"
                    @click="openSaveToCollectionModal"
                >
                    <FontAwesomeIcon :icon="faSave" class="text-2xl text-[#333]" :class="isPhotoRecentlyAddedToCollection && `text-yellow-400 drop-shadow-[0.15rem_0.15rem_0.125rem_#eab308]`" />
                    <span class="text-center hidden">Add</span>
                </div>
            </div>
        </section>
        <section class="mx-6 mt-12 mb-16">
            <h2 class="min-w-[70vw] text-center mt-4 mb-8 -ml-6 py-3 px-6 text-3xl font-bold bg-[#eee] inline-block rounded-r-2xl"> Details </h2>
            <p> <span class="text-base font-bold my-3 mr-2">Image ID:</span>  {{ currPhotoProvider?.getPhotoId(utilizePhotoProvider(viewedPhoto)) }}</p>
            <p> <span class="text-base font-bold my-3 mr-2">Photo resolution:</span> {{ currPhotoProvider?.getPhotoResolution(utilizePhotoProvider(viewedPhoto)) }}</p>
            <p> <span class="text-base font-bold my-3 mr-2">Description:</span> {{ currPhotoProvider?.getPhotoDescription(utilizePhotoProvider(viewedPhoto)) }}</p>
        </section>

        <section class="mx-6 mt-12 mb-16">
            <div class="grid grid-rows-1 grid-cols-[1fr_auto_1fr] items-center">
                <div class="bg-black h-[0.15rem] mr-3 shadow-xl shadow-black"></div>
                <a :href="currPhotoProvider?.getPhotoAuthorImage(utilizePhotoProvider(viewedPhoto))" target="_blank"> <img class="w-24 h-24 mx-3 rounded-full text-xs border-2 shadow-md shadow-black" :src="currPhotoProvider?.getPhotoAuthorImage(utilizePhotoProvider(viewedPhoto))" alt="Author profile picture" /> </a>
                <div class="bg-black h-[0.15rem] ml-3 shadow-xl shadow-black"></div>
            </div>
            <p class="mt-4 mb-6 inline-block text-3xl font-bold text-center w-full"> <a :href="currPhotoProvider?.getAuthorProfileURL(utilizePhotoProvider(viewedPhoto))" target="_blank"> {{ currPhotoProvider?.getPhotoAuthorName(utilizePhotoProvider(viewedPhoto)) }} </a> </p>
            <p class="mb-3"> <span class="text-base my-3 mr-2">If you enjoyed this photo, consider checking out the author page for more photos just like that!  </span></p>
            <p class="mt-3 text-center"> <span class="text-base font-bold my-3 mr-2">Author ID:</span>  #{{ currPhotoProvider?.getAuthorID(utilizePhotoProvider(viewedPhoto)) }} </p>
            <div class="bg-black h-[0.11rem] my-12 shadow-xl shadow-black"></div>
        </section> 
        
        <section class="mx-6 mt-12 mb-16">
            <div class="flex flex-col items-end">
                <h2 class="w-fit min-w-[70vw] text-center mt-4 mb-8 -mr-6 ml-0 py-3 px-6 text-3xl font-bold bg-[#eee] rounded-l-2xl justify-self-end"> Attribution </h2>
            </div>
            <p class="mb-3"> <span class="text-base font-bold my-3 mr-2">Photo provider: </span>  {{ currPhotoProvider?.name?.charAt(0)?.toUpperCase().concat(currPhotoProvider?.name?.slice(1)) }}</p>
            <p class="mb-3"><span class="text-base my-3 mr-2">This photo is available thanks to out provider, {{ currPhotoProvider?.name?.charAt(0)?.toUpperCase().concat(currPhotoProvider?.name?.slice(1)) }}. You can also view the photo on the provider website </span> <a :href="currPhotoProvider?.getProviderWebsite()" target="_blank" class="-mx-1 underline font-medium italic text-base"> <FontAwesomeIcon :icon="faUpRightFromSquare" /> accessible  here </a>  </p>
            
            <p class="mt-9 mb-3"> <span class="text-base font-bold my-3 mr-2">Photo author: </span>  {{ currPhotoProvider?.getPhotoAuthorName(utilizePhotoProvider(viewedPhoto)) }}</p>
            <p class="mb-3"><span class="text-base my-3 mr-2">Support the creator by visiting his profile on the Provider website. Also you can check out the original image source </span> <a :href="currPhotoProvider?.getPhotoOriginalSource(utilizePhotoProvider(viewedPhoto))" target="_blank" class="-mx-1 underline font-medium italic text-base"> <FontAwesomeIcon :icon="faUpRightFromSquare" /> available  here </a>  </p>

        </section>

        <ModalsSaveOrMoveToCollection v-if="isSaveToCollectionModalOpen" 
            :isMoveToMode="false" :imgData="viewedPhoto" :provider="sqStore.currPhotoProviderName" 
            @modalClose="closeSaveToCollectionModal" 
            @addCollectionModalOpen="openAddCollectionModal"
            @confirmAddedToCollection="handleConfirmAddToCollection"
        />

        <ModalsAddOrEditCollection v-if="isAddCollectionModalOpen"
            :isEditMode="false"
            @add="handleAddCollection" 
            @modalClose="closeAddCollectionModal"
        />

    </section>
    <PanelsDetailedPhotoActionPanel />
</template>


<style scoped>

</style>
