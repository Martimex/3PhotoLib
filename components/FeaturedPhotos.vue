<script setup lang="ts">
import { ref } from 'vue';
import { searchPhotosByQuery } from '#imports';
import { availableProviderNames_Array, featuredCategories } from '../types/type_utilities';
import type { availableProviderNames, availablePhotoTypes } from '../types/type_utilities';
import PhotoItem from './PhotoItem.vue';
import PhotoProvider from '~/providers/photoProvidersInitializer';

const { featuredPhotosCategory, featuredPhotosProviderName } = storeToRefs(usePhotoStore());

const featuredImages = ref<availablePhotoTypes[]>([]);
const providerName = ref<availableProviderNames>('pixabay');

onBeforeMount(async() => {
    if(!featuredPhotosCategory.value) { featuredPhotosCategory.value = featuredCategories[Math.floor(Math.random() * featuredCategories.length)]};
    if(!featuredPhotosProviderName.value) { featuredPhotosProviderName.value = availableProviderNames_Array[Math.floor(Math.random() * availableProviderNames_Array.length)]};

    const featuredPhotosArr = await searchPhotosByQuery(
        {queryText: featuredPhotosCategory.value, currPhotoProvider: new PhotoProvider(featuredPhotosProviderName.value).setCurrentProvider(), outputPhotosNumber: 10, searchPageCount: 1},
        {isRequestPending: true, pageModifier: 0}
    );
    
    providerName.value = featuredPhotosProviderName.value;
    if(featuredPhotosArr) { featuredImages.value = featuredPhotosArr }
})

</script>

<template>
    <div v-for="image in featuredImages" :key="image.id" class=""> 
        <PhotoItem :imgData="image" :provider="providerName" />
    </div>
</template>

<style scoped>

</style>