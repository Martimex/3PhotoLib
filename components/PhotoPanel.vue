<script setup lang="ts">
import { utilizePhotoProvider } from '@/types/type_utilities';
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart, faSave, faDownload, faInfo } from '@fortawesome/free-solid-svg-icons';
import type PixabayPhoto from '@/types/photoItem_pixabay';
import type PexelsPhoto from '@/types/photoItem_pexels';
import { useSearchQueryStore } from '@/stores/searchQueryStore';
import { usePhotoStore } from '@/stores/photosStore';
import { storeToRefs } from 'pinia';
import type { availablePhotoTypes, availableProviderNames } from '@/types/type_utilities';
import PhotoProvider from '@/providers/photoProvidersInitializer';
import handleLikePhoto from '@/composables/handleLikePhoto';

const photoPanelEmit = defineEmits(['photoLikedToggle', 'photoDownload', 'modalOpen']);

/* const isPhotoLiked = ref<boolean | null>(null); */

const props = defineProps<{
    imgData: availablePhotoTypes,
    provider: availableProviderNames,
    isPhotoLiked: boolean,
    isNowAddedToCollection: boolean,
    isPhotoDownloaded: boolean
}>();

const [sqStore, psStore, aStore] = [useSearchQueryStore(), usePhotoStore(), useAuthStore()];
const { currPhotoProvider } = storeToRefs(sqStore);
const { viewedPhoto } = storeToRefs(psStore);
const { collectionsOrlikedPhotos_setEditMode,  asyncProcess_get, asyncProcess_set } = useStatusStore();

const providerObj = new PhotoProvider(props.provider).setCurrentProvider();

/* const isSaveToCollectionModalOpen = ref<boolean>(false);
    const closeSaveToCollectionModal = () => isSaveToCollectionModalOpen.value = false;
    const openSaveToCollectionModal = () => isSaveToCollectionModalOpen.value = true; */

function setPhotoAsViewed() {
    viewedPhoto.value = props.imgData;
}

const photoTags = computed(() => providerObj?.retrievePhotoTags(utilizePhotoProvider(props.imgData)))

/* async function handleLikePhoto() {
    
    const currentUser = aStore.currentUser_get();
    if(!currentUser) { throw new Error('User not found! Photo cannot be further liked')}

    if(asyncProcess_get()) { 
        // Here, beside returning we will have to add a dialog box to inform user that a process is currently running
        return; 
    }

    if(props.isPhotoLiked) {
        // Handle showup of liked photos deletion panel and automatically mark the unliked photo as a removed one
        photoPanelEmit('photoDislike', `${props.provider}=${props.imgData.id}`);
        const currentRoute = useRoute().name;
        if(currentRoute) {
            const routeName = currentRoute as string; 
            const routeParts =  routeName.split('-');
            const lastRoutePart = routeParts[routeParts.length - 1];

            // likedPhotos_setEditMode(true);

            if(lastRoutePart !== 'liked') {
                photoIdToUnlike_set(`${props.provider}=${props.imgData.id}`);
                // Perform a redirect ot a /liked endpoint 

                const currentUser = await $fetch('/account/getData', { method: 'post'});

                if(currentUser) {
                    currentUser_set(currentUser.id, currentUser.name, currentUser.email, currentUser.profile_image, currentUser.member_since, currentUser.likedPhotos, currentUser.collections);
                }

                await navigateTo('/home/liked');
            }

            likedPhotos_setEditMode(true);
        }
    }

    
    else {
        //isPhotoLiked.value = true;
        asyncProcess_set(true);
        photoPanelEmit('photoLike');
        await $fetch('/photo/like', { method: 'post', body: {
            userData: currentUser,
            photoData: props.imgData,
            photoID: `${props.provider}=` + props.imgData.id,
            provider: props.provider
        }});
        asyncProcess_set(false);
    }
} */

</script>

<!-- backdrop-blur-sm -->

<template>
    <div class="absolute inset-0 grid grid-rows-[1fr_auto] text-white bg-black/[.25]">
        <div class="p-[1.5rem] backdrop-blur-lg overflow-y-auto grid grid-rows-[auto_1fr]">
            <figure class="grid grid-cols-[auto_1fr] mb-5">
                <a :href="currPhotoProvider?.getAuthorProfileURL(utilizePhotoProvider(props.imgData))" class="w-max" target="_blank">
                    <img class="w-20 h-20 rounded-xl text-xs border-2" :src="providerObj?.getPhotoAuthorImage(utilizePhotoProvider(props.imgData))" alt="Author profile picture" />
                </a>                
                <figcaption class="ml-4 mr-14 flex flex-col justify-center">
                    <p class="text-base leading-relaxed"> Photo by: </p>
                    <p class="text-lg font-medium leading-snug break-all"> {{ providerObj?.getPhotoAuthorName(utilizePhotoProvider(props.imgData)) }} </p>
                </figcaption>
            </figure>

            <section class="my-5">
                <p class="text-base font-light italic"> {{ providerObj?.getPhotoDescription(utilizePhotoProvider(props.imgData)) }} </p>
            </section>

            <NuxtLink :to="{ name: 'home-results-provider=id', params: {id: providerObj?.getPhotoId(utilizePhotoProvider(props.imgData)), provider: providerObj?.name} }"> 
                <FontAwesomeIcon :icon="faInfo" @click="setPhotoAsViewed()" class="text-2xl absolute top-0 right-0 m-[1.5rem] border-2 px-3 py-1 rounded-full"></FontAwesomeIcon>
            </NuxtLink>
        </div>

        <div data-role="panel" class="py-[1rem] px-[1rem] flex w-full items-end justify-between backdrop-blur-md
            border-t-2 border-white shadow-[0rem_-.25rem_.5rem_0rem_#fffa]
        ">
            <FontAwesomeIcon :icon="faHeart" @click.stop="photoPanelEmit('photoLikedToggle')" class="text-xl mx-[1.5rem] place-self-start hover:cursor-pointer" :class="isPhotoLiked && `text-red-500 drop-shadow-[0.15rem_0.15rem_0.125rem_#ef4444]`"></FontAwesomeIcon>
            <FontAwesomeIcon :icon="faDownload" @click.stop="photoPanelEmit('photoDownload')" class="text-xl mx-[1.5rem] place-self-start hover:cursor-pointer" :class="isPhotoDownloaded && `text-green-500 drop-shadow-[0.15rem_0.15rem_0.125rem_#22c55e]`" ></FontAwesomeIcon>
            <FontAwesomeIcon :icon="faSave" @click.stop="$emit('modalOpen')" class="text-xl mx-[1.5rem] place-self-start hover:cursor-pointer" :class="isNowAddedToCollection && `text-yellow-500 drop-shadow-[0.15rem_0.15rem_0.125rem_#eab308]`"></FontAwesomeIcon>
        </div>
    </div>

<!--     <ModalsSaveOrMoveToCollection v-if="isSaveToCollectionModalOpen" :isMoveToMode="false"
        @modalClose="closeSaveToCollectionModal"
    /> -->
    
</template>

<style scoped>

</style>