<script setup lang="ts">
import PhotoItem from '@/components/PhotoItem.vue';
import FeaturedPhotos from '@/components/FeaturedPhotos.vue';
import FeaturedPhotosSkeleton from '@/components/FeaturedPhotosSkeleton.vue';
import photoProviders from '@/providers/photoProvidersInitializer';
import type PixabayPhoto from '@/types/photoItem_pixabay';
import type PexelsPhoto from '@/types/photoItem_pexels';
import { ref } from 'vue';
import { useSearchQueryStore } from '@/stores/searchQueryStore';
import { useStatusStore } from '@/stores/statusStore';
import { storeToRefs } from 'pinia';
import type { availablePhotoTypes } from '@/types/type_utilities';

const [sStore, sqStore] = [useStatusStore(), useSearchQueryStore()];
const { queryText, currPhotoProvider } = storeToRefs(sqStore);
const { isRequestPending } = storeToRefs(sStore);

const featuredPhotosResultsMax = ref(3);

/* TODO: Going to move imgData prop inside the Pinia Store. So instead of doing prop drilling, we will first save response images 
    inside one of Pinia stores, and then retrieve it on-demand whenever necessary !!!
*/

const acceptedProviders = ['pixabay', 'pexels'];

//const x = new photoProviders('pexels').setCurrentProvider();
console.log(/* x,  */currPhotoProvider.value);

/* type GeneralPhoto<T> =
    T extends PixabayPhoto? PixabayPhoto[] :
    T extends PexelsPhoto? PexelsPhoto[] :
    never
; */

const imageData = ref<availablePhotoTypes[]>([]);
console.warn(typeof currPhotoProvider.value, typeof currPhotoProvider, currPhotoProvider.value);

// const imageData = ref<typeof currPhotoProvider.value extends PixabayPhoto? PixabayPhoto[] : PexelsPhoto[]>([]);

/* function checkRequestParametersOK(provider: any, querySearchText: string): boolean {
    if(!provider) return false;
    if(typeof provider.getSearchRequestURL(querySearchText) !== 'string') return false;
    return true;
} */

sqStore.$subscribe(async() => {
    if(currPhotoProvider.value === undefined || !currPhotoProvider.value) return; // This line silences error where TS complies that x (Provider Name) can be possibly undefined
    await fetch(currPhotoProvider.value.getSearchRequestURL(queryText.value), {headers: currPhotoProvider.value.getSearchRequestHeaders()})
        .then(res => res.json())
        // Used " currPhotoProvider.value! " below, beause we checked above already that the  currPhotoProvider.value is NOT undefined
        .then(data => { imageData.value =  currPhotoProvider.value!.getResponsePhotos(data); console.warn(data) })
        .catch(err => console.error(err));
    
    // After fetching data, resolve status as non-pending
    isRequestPending.value = false;
});

</script>


<template>
    <section class="min-h-screen text-xl mx-4">
        <p class="text-4xl mb-8 bold"> Featured: {{ imageData.length }} </p>
        <Suspense>
            <template #default>
                <FeaturedPhotos/>
            </template>
            <template #fallback>
                <FeaturedPhotosSkeleton :skeletonsCount="featuredPhotosResultsMax" />
            </template>
        </Suspense>

        <div v-if="!imageData.length">
            <p class="text-2xl bold text-red-400"> No images found ❌</p>
        </div>
        <div v-else-if="imageData">
            <div v-if="!isRequestPending" class="">
                <!-- <p class="text-2xl bold text-green-400"> Got some images data ✅</p> -->
                <PhotoItem v-for="image in imageData" :key="image.id" :imgData="image"/>
            </div>
            <div v-if="isRequestPending" class="">
                <p class="text-2xl bold text-yellow-400"> Pending... Please wait 🥰</p>
            </div>
        </div>
        
    </section>
</template>


<style scoped>

</style>