<script setup lang="ts">
import PhotoItem from '@/components/PhotoItem.vue';
import FeaturedPhotos from '@/components/FeaturedPhotos.vue';
import FeaturedPhotosSkeleton from '@/components/FeaturedPhotosSkeleton.vue';
import type PixabayPhoto from '@/types/photoItem_pixabay';
import { ref } from 'vue';
import { useSearchQueryStore } from '@/stores/searchQueryStore';
import { useStatusStore } from '@/stores/statusStore';
import { storeToRefs } from 'pinia';

const [sStore, sqStore] = [useStatusStore(), useSearchQueryStore()];
const { queryText } = storeToRefs(sqStore);
const { isRequestPending } = storeToRefs(sStore);

const featuredPhotosResultsMax = ref(3);

const imageData = ref<PixabayPhoto[]>([]);

sqStore.$subscribe(async() => {
    await fetch(`https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API}&q=${queryText.value}&image_type=photo&page=1`)
        .then(res => res.json())
        .then(data => imageData.value = (data.hits?.length)? data.hits : [])
        .catch(err => console.error(err));
    
    // After fetching data, resolve status as non-pending
    isRequestPending.value = false;
});

</script>


<template>
    <section class="min-h-screen text-xl mx-4">
        <p class="text-4xl mb-8 bold"> Featured </p>
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
            <div v-if="!isRequestPending" v-for="image in imageData" :key="image.id" class="">
                <!-- <p class="text-2xl bold text-green-400"> Got some images data ✅</p> -->
                <PhotoItem :imgData="image"/>
            </div>
            <div v-if="isRequestPending" class="">
                <p class="text-2xl bold text-yellow-400"> Pending... Please wait 🥰</p>
            </div>
        </div>
        
    </section>
</template>


<style scoped>

</style>