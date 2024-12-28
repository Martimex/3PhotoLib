<script setup lang="ts">
import { getRandomLikedPhotosViewedLimit, getRandomCollectionsViewedLimit } from '~/utils/getAccountLimitations';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRight, faFolder  } from '@fortawesome/free-solid-svg-icons';
import PhotoProvider from '@/providers/photoProvidersInitializer';
import type PhotoResponseModel from '~/types/responseModel_photo';
import type CollectionResponseModel from '~/types/responseModel_collection';
import type { availablePhotoTypes, availableProviderNames, randomlyPickedObj } from '~/types/type_utilities';
import { utilizePhotoProvider } from '~/types/type_utilities';
import requestImagePhoto from '~/composables/requestImagePhoto';
import UserLikedImage from '~/components/Account/UserLikedImage.vue';

const { currentUser_get } = useAuthStore();

const userData = currentUser_get();
const { currentBreakpoint } = storeToRefs(useStatusStore());

if(!userData) { throw new Error('ERROR: User data not found'); }

const [userLikedPhotos, userCollections] = [ref<PhotoResponseModel[]>(userData.likedPhotos), ref<CollectionResponseModel[]>(userData.collections)];
const [randomLikedPhotos, randomCollections] = [ref<PhotoResponseModel[]>([]), ref<CollectionResponseModel[]>([])];
const isLogoutMenuOpen = ref<boolean>(false);
const isTeleportReady = ref<boolean>(false);

// Used to determine if page content requires a Y-scrollbar to be used 
const isContentOverflow = ref<boolean>(false);

function handleTryToLogout() {
    isLogoutMenuOpen.value = true;
}

function handleModalClose() {
    isLogoutMenuOpen.value = false;
}

function testContentOverflow(): boolean {
    if(document.body.scrollHeight > window.screen.height) return true;
    return false;
}

onMounted(() => {
    isTeleportReady.value = true;
    isContentOverflow.value = testContentOverflow();
})


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

// Used for <Teleport> functionality
const checkTeleportConditions = computed(() => { return testTeleportConditions(currentBreakpoint.value, isTeleportReady.value); })

</script>

<template>

    <NavigationBar />

    <section :class="isContentOverflow && `min-h-screen`" class="my-12 mx-4 min-h-fit pb-20
        sm:pb-0
    ">
        <div class="mb-9
            sm:flex sm:flex-col sm:items-center sm:justify-center
        ">
            <div class="grid grid-cols-[auto_1fr] grid-rows-1 items-center gap-x-9 mb-6
                lg:justify-content-center
            ">
                <img alt="Profile picture" src="/public/icon-default.png" class="w-28 h-28 ml-3 rounded-[50%] bg-contain border-4 border-solid border-black
                    sm:mx-0
                    lg:w-36 lg:h-36
                " />
                <h2 class="text-4xl font-semibold break-all
                    lg:text-6xl lg:leading-relaxed
                "> {{ userData.name }} </h2>
            </div>
            <p class="italic font-light text-lg text-[#222] mx-3
                sm:max-w-[440px] sm:text-center sm:my-3
                lg:max-w-[660px] lg:text-xl 
            ">
                Hello there! I am the 3PhotoLib verified user.
                Feel free to explore my portfolio of fresh and creative photographies.
            </p>
        </div>
        <div class="grid grid-cols-1 gap-y-12
            sm:grid-cols-2 sm:gap-x-12 sm:my-16
            lg:my-24
        ">
            <section>
                <div class="flex flex-col">
                    <NuxtLink to="/home/liked">
                        <div class="flex mb-3 w-fit">
                            <FontAwesomeIcon :icon="faArrowRight" class="text-4xl mx-6"></FontAwesomeIcon>
                            <p class="text-2xl w-fit mb-3
                                sm:mb-5
                                lg:mb-8 lg:text-3xl
                            "> Liked photos ({{ userLikedPhotos.length }}) </p>
                        </div>
                    </NuxtLink>
                    <div class="grid grid-cols-2 grid-rows-auto gap-3">
                        <div v-for="(photo, index) in randomLikedPhotos" >
                            <UserLikedImage :photoData="photo" />
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="flex flex-col">
                    <NuxtLink to="/home/collections" >      
                        <div class="flex mb-6 w-fit">
                            <FontAwesomeIcon :icon="faArrowRight" class="text-4xl mx-6
                                sm:ml-9
                            "></FontAwesomeIcon>
                            <p class="text-2xl mb-3
                                sm:mb-5
                                lg:mb-8 lg:text-3xl
                            "> My collections ({{ userCollections.length }}) </p>
                        </div>
                    </NuxtLink>
                    <div class="grid grid-cols-2 grid-rows-auto gap-3 place-content-center
                        lg:grid-cols-3
                    ">
                        <div v-for="collection in randomCollections">
                                <NuxtLink :to="`/home/collections/${collection.releaseId}`" class="blur-bg flex flex-col justify-center items-center truncate">
                                    <FontAwesomeIcon :icon="faFolder" :class="`text-[${collection.folderColor}]`" class="text-7xl drop-shadow-[0rem_0rem_0.2rem_#000]
                                        sm:text-[5rem]
                                        md:text-[6rem]
                                        lg:text-[7rem]
                                    " />
                                    <p class="text-base font-semibold truncate w-max-[10%] mt-2 mb-4
                                        lg:text-lg lg:font-normal
                                    "> {{ collection.name }} </p>
                                </NuxtLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </section>

    <ModalsLogout v-if="isLogoutMenuOpen" 
        @modalClose="handleModalClose"
    />

    <Teleport to="#top-panel-teleport" v-if="checkTeleportConditions" >
        <PanelsAccountActionPanel :isContentOverflow="isContentOverflow" @tryToLogOut="handleTryToLogout" 
            :class="getTeleportedPanelClasses()" :disable-blur="true" 
        />
    </Teleport>

    <PanelsAccountActionPanel v-else :isContentOverflow="isContentOverflow" @tryToLogOut="handleTryToLogout" />
    
</template>

<style scoped>

</style>