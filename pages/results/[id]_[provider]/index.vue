<script setup lang="ts">
import PhotoProvider from '~/providers/photoProvidersInitializer';
import { useSearchQueryStore } from '@/stores/searchQueryStore';
import { usePhotoStore } from '@/stores/photosStore';
import { utilizePhotoProvider, availableProviderNames_Array } from '~/types/type_utilities';
import type { availableProviderNames } from '~/types/type_utilities';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart, faDownload, faSave, faLink, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const route = useRoute();
const [sqStore, psStore] = [useSearchQueryStore(), usePhotoStore()];
const { queryText, currPhotoProvider, currPhotoProviderName } = storeToRefs(sqStore);
const { viewedPhoto } = storeToRefs(psStore);

function isOfType(value: any): value is availableProviderNames {
    return availableProviderNames_Array.includes(value);
}

onMounted(() => {
    console.warn(`DETAILED COMPONENT DATA: \n ` )
})

function requestViewedPhoto() {
    // WILL WORK TOWARDS ACCOMPLISHING THIS IN THE FUTURE UPDATES
    
    // Perform an search-by-ID request with async await (similiar to regular photos query)
    if(isOfType(`${route.params.provider}`)) {
       // const photoToView = new PhotoProvider(route.params.provider).setCurrentProvider()
    }

    //return viewedPhoto;
}

</script>

<template>
    <NavigationBar />
    <section class="min-h-screen text-lg">
        <section>
            <div class="flex justify-center">
                <img :src="currPhotoProvider?.getHighResImageURL(utilizePhotoProvider(viewedPhoto? viewedPhoto : viewedPhoto!/*In future updates it should be: requestViewedPhoto() */))" loading="lazy" class="my-1 w-full object-cover object-center transition-opacity rounded-md shadow-md shadow-black" />
            </div>
            <div class="grid grid-cols-4 grid-rows-1 justify-between">
                <!-- BUTTONS FUNCTIONALITY TO BE IMPLEMENTED SOON -->
                <div class="p-3 py-5 flex flex-col justify-between align-top shadow-md shadow-red-500 rounded-[10%] border-solid border-[#333] border-2 border-t-0">
                    <FontAwesomeIcon :icon="faHeart" class="text-3xl text-[#333]" />
                    <span class="text-center hidden">Like</span>
                </div>
                <div class="px-3 py-5 flex flex-col justify-center align-top shadow-md shadow-green-500 rounded-[10%] border-solid border-[#333] border-2 border-t-0">
                    <FontAwesomeIcon :icon="faDownload" class="text-3xl text-[#333]" />
                    <span class="text-center hidden">Download</span>
                </div>
                <div class="p-3 flex flex-col justify-center align-top shadow-md shadow-blue-500 rounded-[10%] border-solid border-[#333] border-2 border-t-0">
                    <FontAwesomeIcon :icon="faLink" class="text-3xl text-[#333]" />
                    <span class="text-center hidden">Website</span>
                </div>
                <div class="p-3 flex flex-col justify-center align-top shadow-md shadow-yellow-500 rounded-[10%] border-solid border-[#333] border-2 border-t-0">
                    <FontAwesomeIcon :icon="faSave" class="text-3xl text-[#333]" />
                    <span class="text-center hidden">Add</span>
                </div>
            </div>
        </section>
        <section class="mx-6 mt-12 mb-16">
            <h2 class="min-w-[70vw] text-center mt-4 mb-8 -ml-6 py-3 px-6 text-3xl font-bold bg-[#eee] inline-block rounded-r-2xl"> Details </h2>
            <p> <span class="text-base font-bold my-3 mr-2">Image ID:</span>  {{ currPhotoProvider?.getPhotoId(utilizePhotoProvider(viewedPhoto? viewedPhoto : viewedPhoto!)) }}</p>
            <p> <span class="text-base font-bold my-3 mr-2">Photo resolution:</span> {{ currPhotoProvider?.getPhotoResolution(utilizePhotoProvider(viewedPhoto? viewedPhoto : viewedPhoto!)) }}</p>
            <p> <span class="text-base font-bold my-3 mr-2">Description:</span> {{ currPhotoProvider?.getPhotoDescription(utilizePhotoProvider(viewedPhoto? viewedPhoto : viewedPhoto!)) }}</p>
        </section>

        <section class="mx-6 mt-12 mb-16">
            <div class="grid grid-rows-1 grid-cols-[1fr_auto_1fr] items-center">
                <div class="bg-black h-[0.15rem] mr-3 shadow-xl shadow-black"></div>
                <!-- <h2 class="mt-4 mb-8 py-3 px-6 text-2xl font-bold inline-block rounded-2xl text-center"> Created by:  </h2> -->
                <a :href="currPhotoProvider?.getPhotoAuthorImage(utilizePhotoProvider(viewedPhoto? viewedPhoto : viewedPhoto!))" target="_blank"> <img class="w-24 h-24 mx-3 rounded-full text-xs border-2 shadow-md shadow-black" :src="currPhotoProvider?.getPhotoAuthorImage(utilizePhotoProvider(viewedPhoto? viewedPhoto : viewedPhoto!))" alt="Author profile picture" /> </a>
                <div class="bg-black h-[0.15rem] ml-3 shadow-xl shadow-black"></div>
            </div>
            <p class="mt-4 mb-6 inline-block text-3xl font-bold text-center w-full"> <a :href="currPhotoProvider?.getAuthorProfileURL(utilizePhotoProvider(viewedPhoto? viewedPhoto : viewedPhoto!))" target="_blank"> {{ currPhotoProvider?.getPhotoAuthorName(utilizePhotoProvider(viewedPhoto? viewedPhoto : viewedPhoto!)) }} </a> </p>
            <p class="mb-3"> <span class="text-base my-3 mr-2">If you enjoyed this photo, consider checking out the author page for more photos just like that!  </span></p>
            <p class="mt-3 text-center"> <span class="text-base font-bold my-3 mr-2">Author ID:</span>  #{{ currPhotoProvider?.getAuthorID(utilizePhotoProvider(viewedPhoto? viewedPhoto : viewedPhoto!)) }} </p>
            <div class="bg-black h-[0.11rem] my-12 shadow-xl shadow-black"></div>
        </section> 
        
        <section class="mx-6 mt-12 mb-16">
            <div class="flex flex-col items-end">
                <h2 class="w-fit min-w-[70vw] text-center mt-4 mb-8 -mr-6 ml-0 py-3 px-6 text-3xl font-bold bg-[#eee] rounded-l-2xl justify-self-end"> Attribution </h2>
            </div>
            <p class="mb-3"> <span class="text-base font-bold my-3 mr-2">Photo provider: </span>  {{ currPhotoProvider?.name?.charAt(0)?.toUpperCase().concat(currPhotoProvider?.name?.slice(1)) }}</p>
            <p class="mb-3"><span class="text-base my-3 mr-2">This photo is available thanks to out provider, {{ currPhotoProvider?.name?.charAt(0)?.toUpperCase().concat(currPhotoProvider?.name?.slice(1)) }}. You can also view the photo on the provider website </span> <a :href="currPhotoProvider?.getProviderWebsite()" target="_blank" class="-mx-1 underline font-medium italic text-base"> <FontAwesomeIcon :icon="faUpRightFromSquare" /> accessible  here </a>  </p>
            
            <p class="mt-9 mb-3"> <span class="text-base font-bold my-3 mr-2">Photo author: </span>  {{ currPhotoProvider?.getPhotoAuthorName(utilizePhotoProvider(viewedPhoto? viewedPhoto : viewedPhoto!)) }}</p>
            <p class="mb-3"><span class="text-base my-3 mr-2">Support the creator by visiting his profile on the Provider website. Also you can check out the original image source </span> <a :href="currPhotoProvider?.getPhotoOriginalSource(utilizePhotoProvider(viewedPhoto? viewedPhoto : viewedPhoto!))" target="_blank" class="-mx-1 underline font-medium italic text-base"> <FontAwesomeIcon :icon="faUpRightFromSquare" /> available  here </a>  </p>

        </section>
    </section>
    <ActionPanel />
</template>


<style scoped>
    .test {
        border: .2rem solid #333;
        border-radius: 10%;
    }

    .test2 {
        border: 0rem solid #333;
        border-radius: 10%;
        border-top: none;
    }
</style>
