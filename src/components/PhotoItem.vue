<script setup lang="ts">
import type PixabayPhoto  from '../types/photoItem_pixabay';
import { computed, ref } from 'vue';

const props = defineProps<{
    imgData: PixabayPhoto
}>();

const [blurRef, imgRef] = [ref<HTMLDivElement>(), ref<HTMLImageElement>()];

//if(imgRef.complete)

const lowResImg = computed(() => props.imgData);

const getBgImg = function() {
    return `url(${lowResImg.value.previewURL})`
}

</script>

<template>
    <div ref="blurRef" class="blur-bg flex justify-center bg-cover bg-center mx-2 my-4 min-w-[80vw] max-w-[90vw] min-h-[20vh] rounded-md shadow-md shadow-black transition-opacity">
        <img ref="imgRef" :src="imgData.largeImageURL" loading="lazy" class="min-h-[40vh] object-cover object-center transition-opacity" />    
    </div>

</template>


<style scoped>
    .blur-bg {
        background-image: v-bind(getBgImg());
    }
</style>