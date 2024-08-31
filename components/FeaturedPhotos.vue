<script setup lang="ts">
import { ref } from 'vue';
import PhotoItem from './PhotoItem.vue';
import type PixabayPhoto from '@/types/photoItem_pixabay';
import type { availableProviderNames } from '../types/type_utilities';

const featuredImages = ref<PixabayPhoto[]>([]);
const providerName = ref<availableProviderNames>('pixabay');

await fetch(`https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API}&q=garden&image_type=photo&page=1&per_page=10`)
        .then(res => res.json())
        .then(data => featuredImages.value = (data.hits?.length)? data.hits : [])
        //.then(() => { return new Promise<void>((resolve, reject) => { setTimeout(() => { resolve(); }, 4500); }) });

</script>

<template>
    <div v-for="image in featuredImages" :key="image.id" class=""> 
        <PhotoItem :imgData="image" :provider="providerName" />
    </div>
</template>

<style scoped>

</style>