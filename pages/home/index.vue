<script setup lang="ts">
import PhotoItem from '@/components/PhotoItem.vue';
import FeaturedPhotos from '@/components/FeaturedPhotos.vue';
import FeaturedPhotosSkeleton from '@/components/FeaturedPhotosSkeleton.vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import type { availablePhotoTypes } from '@/types/type_utilities';
//import type availablePhotoTypes from '';

const { currentUser_get } = useAuthStore();
const [sStore, sqStore] = [useStatusStore(), useSearchQueryStore()];
const { queryText, currPhotoProvider } = storeToRefs(sqStore);
const { isRequestPending, isSearchbarOpen } = storeToRefs(sStore);

//const token = useCookie('token');
const featuredPhotosResultsMax = ref(3);

/* TODO: Going to move imgData prop inside the Pinia Store. So instead of doing prop drilling, we will first save response images 
    inside one of Pinia stores, and then retrieve it on-demand whenever necessary !!!
*/

//const x = new photoProviders('pexels').setCurrentProvider();

/* type GeneralPhoto<T> =
    T extends PixabayPhoto? PixabayPhoto[] :
    T extends PexelsPhoto? PexelsPhoto[] :
    never
; */

const imageData = ref<availablePhotoTypes[]>([]);

//console.warn(typeof currPhotoProvider.value, typeof currPhotoProvider, currPhotoProvider.value);

// const imageData = ref<typeof currPhotoProvider.value extends PixabayPhoto? PixabayPhoto[] : PexelsPhoto[]>([]);

/* function checkRequestParametersOK(provider: any, querySearchText: string): boolean {
    if(!provider) return false;
    if(typeof provider.getSearchRequestURL(querySearchText) !== 'string') return false;
    return true;
} */

onUnmounted(() => isSearchbarOpen.value = false);

</script>


<template>
    <NavigationBar />
    <section class="min-h-screen text-xl mx-4 py-[10vh]">
        <p class="text-3xl mb-24 bold text-center underline"> Hello, {{ currentUser_get()?.name }}</p>
        <p class="text-2xl font-semibold my-8 text-center"> [ Featured photos ] </p>
        <Suspense>
            <template #default>
                <FeaturedPhotos/>
            </template>
            <template #fallback>
                <FeaturedPhotosSkeleton :skeletonsCount="featuredPhotosResultsMax" />
            </template>
        </Suspense>

<!--         <div v-if="!imageData.length">
            <p class="text-2xl bold text-red-400"> No images found ❌</p>
        </div>
        <div v-else-if="imageData">
            <div v-if="!isRequestPending" class="">
                <PhotoItem v-for="image in imageData" :key="image.id" :imgData="image"/>
            </div>
            <div v-if="isRequestPending" class="">
                <p class="text-2xl bold text-yellow-400"> Pending... Please wait 🥰</p>
            </div>
        </div> -->
    
    </section>
    <ActionPanel />
</template>


<style scoped>

</style>