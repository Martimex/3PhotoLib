<script setup lang="ts">
/* import FeaturedPhotos from '@/components/FeaturedPhotos.vue';
import FeaturedPhotosSkeleton from '@/components/FeaturedPhotosSkeleton.vue';
import photoProviders from '@/providers/photoProvidersInitializer';
import type PixabayPhoto from '@/types/photoItem_pixabay';
import type PexelsPhoto from '@/types/photoItem_pexels'; */
import PhotoItem from '@/components/PhotoItem.vue';
import { ref, onMounted } from 'vue';
import { useSearchQueryStore } from '@/stores/searchQueryStore';
import { useStatusStore } from '@/stores/statusStore';
import { storeToRefs } from 'pinia';
import type { availablePhotoTypes } from '@/types/type_utilities';

const [sStore, sqStore] = [useStatusStore(), useSearchQueryStore()];
const { queryText, currPhotoProvider, outputPhotosNumber, searchPageCount } = storeToRefs(sqStore);
const { isRequestPending } = storeToRefs(sStore);


const imageData = ref<availablePhotoTypes[]>([]);

// For Pexels only, the search "red" causes no result being displayed and result in weird errors. Investigate this issue further !

sqStore.$subscribe(async() => {
    if(currPhotoProvider.value === undefined || !currPhotoProvider.value) return; // This line silences error where TS complies that x (Provider Name) can be possibly undefined
    const initialPageRequestData = await fetch(currPhotoProvider.value.getSearchRequestURL(queryText.value, outputPhotosNumber.value, 1), {headers: currPhotoProvider.value.getSearchRequestHeaders()})
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.error(err))
    
    if(searchPageCount.value === 1) {
        imageData.value = currPhotoProvider.value.getResponsePhotos(initialPageRequestData);
    } else {
        // User picked page number is higher than 1 -> perform calculations if requested page number even exists. If so, provide
        // results for the page. Otherwise, return the latest page that contain photos + inform user about the behaviour
        const maxPageForRequest = currPhotoProvider.value.getMaxPageNumber(initialPageRequestData, outputPhotosNumber.value);
        const searchPageFinal = (maxPageForRequest < searchPageCount.value)? maxPageForRequest : searchPageCount.value;

        const finalSearchPageRequestData = await fetch(currPhotoProvider.value.getSearchRequestURL(queryText.value, outputPhotosNumber.value, searchPageFinal), {headers: currPhotoProvider.value.getSearchRequestHeaders()})
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.error(err))
        
            imageData.value = currPhotoProvider.value.getResponsePhotos(finalSearchPageRequestData);
    }

    // Because we performed an above, initial data request, now we know how many photos are available, and thus what is the latest
    // possible page that contains at least 1 photo - useful in cases where user selects too big "page number" option that would not
    // return any results. In such situation, user will be shown the very last page that contains any images

    // After fetching data, resolve status as non-pending
    isRequestPending.value = false;
});

async function getPhotos() {
    if(currPhotoProvider.value === undefined || !currPhotoProvider.value) return; // This line silences error where TS complies that x (Provider Name) can be possibly undefined

    await fetch(currPhotoProvider.value.getSearchRequestURL(queryText.value, outputPhotosNumber.value, searchPageCount.value), {headers: currPhotoProvider.value.getSearchRequestHeaders()})
        .then(res => {console.warn(' res is: ', res); return res.json()})
        // Used " currPhotoProvider.value! " below, beause we checked above already that the  currPhotoProvider.value is NOT undefined
        .then(data => { imageData.value =  currPhotoProvider.value!.getResponsePhotos(data); console.warn(`RES DATA: `, data) })
        .catch(err => console.error(err));

    // After fetching data, resolve status as non-pending
    isRequestPending.value = false;
}

onMounted(() => getPhotos());

</script>


<template>
    <section class="min-h-screen text-xl mx-4">
        <p class="text-4xl mb-8 bold"> Results for: "{{ queryText }}" </p>

        <div v-if="!imageData.length">
            <p class="text-2xl bold text-red-400"> No images found ❌</p>
        </div>
        <div v-else-if="imageData">
            <div v-if="!isRequestPending" class="">
                <!-- Slicing works well for providers API, which reqire minimal response photos, while this app does not  -->
                <PhotoItem v-for="image in imageData.slice(0, outputPhotosNumber)" :key="image.id" :imgData="image"/>
            </div>
            <div v-if="isRequestPending" class="">
                <p class="text-2xl bold text-yellow-400"> Pending... Please wait 🥰</p>
            </div>
        </div>
    </section>
</template>


<style scoped>

</style>