<script setup lang="ts">
import type PixabayPhoto  from '../types/photoItem_pixabay';
import PhotoPanel from './PhotoPanel.vue';
import { useStatusStore } from '@/stores/statusStore';
import { computed, ref, onMounted } from 'vue';

const sStore = useStatusStore();

const props = defineProps<{
    imgData: PixabayPhoto
}>();

const imgRef = ref<HTMLImageElement>();
const isImgLoaded = ref<boolean>(false);
const isPhotoPanelOpen = ref<boolean>(false);

function handleImgLoadded() {
    console.log('Handled loading process !');
    isImgLoaded.value = true;
}

onMounted(() => {
    if(imgRef?.value?.complete) {
        handleImgLoadded();
    } else {
        imgRef?.value?.addEventListener('load', handleImgLoadded);
    }
});

const photoData = computed(() => props.imgData);

const getBgImg = function() {
    return `url(${photoData.value.previewURL})`
}

const handleFullScreenPhotoView = function() {
    if(!isImgLoaded.value) return;
    isPhotoPanelOpen.value = !isPhotoPanelOpen.value;
}

</script>

<template>
    <div @click="handleFullScreenPhotoView" :class="{ loaded: isImgLoaded }"  class="blur-bg relative flex justify-center bg-cover bg-center mx-2 my-4 min-w-[80vw] max-w-[90vw] min-h-[20vh] rounded-md shadow-md shadow-black transition-opacity">
        <img ref="imgRef" :src="imgData.largeImageURL" loading="lazy" class="min-h-[40vh] object-cover object-center transition-opacity" />    
        <PhotoPanel v-if="isPhotoPanelOpen" :photoData="photoData"/>
    </div>
</template>


<style scoped>

    @keyframes loadPulse {
        0% {
            background-color: #fff2;
        }

        100% {
            background-color: #fff4;
        }
    }

    .blur-bg {
        background-image: v-bind(getBgImg());
    }

    .blur-bg::before {
        content: '';
        position: absolute;
        inset: 0;
        animation: loadPulse 1.25s linear infinite alternate;
    }

    .blur-bg.loaded::before {
        content: none;
    }

    img {
        opacity: 0;
        transition: opacity 300ms ease-in-out;
    }

    .loaded img {
        opacity: 1;

    }
</style>