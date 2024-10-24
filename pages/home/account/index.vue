<script setup lang="ts">
import { getRandomLikedPhotosViewedLimit, getRandomCollectionsViewedLimit } from '~/utils/getAccountLimitations';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRight, faFolder  } from '@fortawesome/free-solid-svg-icons';
import PhotoProvider from '@/providers/photoProvidersInitializer';
import type PhotoResponseModel from '~/types/responseModel_photo';
import type CollectionResponseModel from '~/types/responseModel_collection';
import type { availablePhotoTypes, availableProviderNames, randomlyPickedObj } from '~/types/type_utilities';
import { utilizePhotoProvider } from '~/types/type_utilities';

const { currentUser_get } = useAuthStore();

const userData = currentUser_get();

if(!userData) { throw new Error('ERROR: User data not found'); }

const [userLikedPhotos, userCollections] = [ref<PhotoResponseModel[]>(userData.likedPhotos), ref<CollectionResponseModel[]>(userData.collections)];
const [randomLikedPhotos, randomCollections] = [ref<PhotoResponseModel[]>([]), ref<CollectionResponseModel[]>([])];
const isLogoutMenuOpen = ref<boolean>(false);

const getPhotoURL = function(photo: PhotoResponseModel) {
    return new PhotoProvider(photo.provider).setCurrentProvider()?.getHighResImageURL(utilizePhotoProvider(photo.photoDetails));
}

const requestImagePhoto = async function(ev: Event, provider: availableProviderNames, photoDetails: availablePhotoTypes) {
    // Pixabay is probably constantly changing IMG URL's, in which case the specific photo URL has to be reassigned with photo ID search,
    // and also appropiate DB data needs to be updated.
    const targetElement = ev.target as HTMLImageElement;
    const providerObj = new PhotoProvider(provider).setCurrentProvider()

    const requestedPhoto =  providerObj?.getSinglePhotoById(utilizePhotoProvider(photoDetails.id as any));
    const data = await $fetch(`${requestedPhoto}`, { headers: providerObj?.getSearchRequestHeaders() })
        .then(res => providerObj?.getSinglePhoto(utilizePhotoProvider(res as availablePhotoTypes )));

    if(!data) { throw new Error('The photo data fetch has failed'); }

   //console.error(`🪲🪲🪲 THE URL FOR LARGE IMAGE HAS ELAPSED AND THEREFORE NEEDS TO BE UPDATED. NOTE ITS DEBUG MESSAGE ONLY. ⭐⭐⭐ The provider is: `, provider);

    if(providerObj) {
        targetElement.src = providerObj?.getHighResImageURL(utilizePhotoProvider(data))
    }

    // Last of all lets update the photoDetails object (database photo record)
    await $fetch(`/photo/updateData`, { method: 'post', body: {
        photoData: data,
        photoID: `${provider}=${data.id}`
    }});
}

function handleTryToLogout() {
    isLogoutMenuOpen.value = true;
}

function handleModalClose() {
    isLogoutMenuOpen.value = false;
}

onBeforeMount(() => {
    const itemsToPickAtRandom: randomlyPickedObj = { 
        likedPhotos: { value: [...userLikedPhotos.value], limit: getRandomLikedPhotosViewedLimit() }, 
        collections: { value: [...userCollections.value], limit: getRandomCollectionsViewedLimit()  }
    };

    const pickedRandomly: randomlyPickedObj = { likedPhotos: [], collections: [] };

    const itemsToPickAtRandom_keys = Object.keys(itemsToPickAtRandom) as [keyof randomlyPickedObj]

    itemsToPickAtRandom_keys.forEach((key: keyof randomlyPickedObj) => {
        for(let i=0; i<itemsToPickAtRandom[key].limit; i++) {
            let rand = Math.floor(Math.random() * itemsToPickAtRandom[key].value.length);
            if(itemsToPickAtRandom[key].value[rand]) { pickedRandomly[key].push(itemsToPickAtRandom[key].value[rand]) }
            else { break; }
            itemsToPickAtRandom[key].value.splice(rand, 1);
        }
    });

    randomLikedPhotos.value = pickedRandomly.likedPhotos;
    randomCollections.value = pickedRandomly.collections;
    
})

</script>

<template>
    <section class="min-h-screen my-12 mx-4">
        <div class="grid grid-cols-[auto_1fr] grid-rows-1 items-center gap-x-9 mb-6">
            <img class="w-28 h-28 rounded-[50%] bg-contain border-4 border-solid border-black" alt="Profile picture" src="/public/icon-default.png" />
            <h2 class="text-4xl font-semibold break-all"> {{ userData.name }} </h2>
        </div>
        <p class="italic font-light text-lg text-[#222] mx-3">
            Hello there! I am the 3PhotoLib verified user.
            Feel free to explore my portfolio of fresh and creative photographies.
        </p>
        <section class="my-9">
            <div class="flex flex-col">
                <NuxtLink to="/home/liked">
                    <div class="flex mb-3 w-fit">
                        <FontAwesomeIcon :icon="faArrowRight" class="text-4xl mx-6"></FontAwesomeIcon>
                        <p class="text-2xl w-fit mb-3"> Liked photos ({{ userLikedPhotos.length }}) </p>
                    </div>
                </NuxtLink>
                <div class="grid grid-cols-2 grid-rows-auto gap-3">
                    <div v-for="(photo, index) in randomLikedPhotos" >
                        <img 
                            :src="getPhotoURL(photo)" loading="lazy" @error="requestImagePhoto($event, photo.provider, photo.photoDetails)"
                            class="p-2 w-full h-36 object-cover object-center transition-opacity rounded-md shadow-md shadow-black border-2 border-[#2227]"
                        />
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="flex flex-col">
                <NuxtLink to="/home/collections" >      
                    <div class="flex mb-6 w-fit">
                        <FontAwesomeIcon :icon="faArrowRight" class="text-4xl mx-6"></FontAwesomeIcon>
                        <p class="text-2xl mb-3"> My collections ({{ userCollections.length }}) </p>
                    </div>
                </NuxtLink>
                <div class="grid grid-cols-3 grid-rows-auto gap-3 place-content-center">
                    <div v-for="collection in randomCollections" class="flex flex-col justify-center items-center truncate" >
                        <FontAwesomeIcon :icon="faFolder" :class="`text-[${collection.folderColor}]`" class="text-7xl drop-shadow-[0rem_0rem_0.2rem_#000]" />
                        <p class="text-lg font-semibold truncate w-max-[10%] mt-2 mb-4"> {{ collection.name }} </p>
                    </div>
                </div>
            </div>
        </section>
    </section>

    <ModalsLogout v-if="isLogoutMenuOpen" 
        @modalClose="handleModalClose"
    />

    <PanelsAccountActionPanel
        @tryToLogOut="handleTryToLogout"
    />
</template>

<style scoped>

</style>