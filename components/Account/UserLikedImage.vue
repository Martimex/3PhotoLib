<script setup lang="ts">

import type PhotoResponseModel from '~/types/responseModel_photo';
import PhotoProvider from '@/providers/photoProvidersInitializer';
import { utilizePhotoProvider } from '~/types/type_utilities';

const props = defineProps<{
    photoData: PhotoResponseModel
}>();

const providerObj = new PhotoProvider(props.photoData.provider).setCurrentProvider();
const isImgLoaded = ref<boolean>(false);
const imgRef = ref<HTMLImageElement>();


const getBgImg = function() {
    return `url(${providerObj?.getLowResImageURL(utilizePhotoProvider(props.photoData.photoDetails))})`
}

function handleImgLoadded() {
    isImgLoaded.value = true;
}

onMounted(() => {
    if(imgRef?.value?.complete) {
        handleImgLoadded();
    } else {
        imgRef?.value?.addEventListener('load', handleImgLoadded);
    }
});

</script>

<template>
    <img 
        ref="imgRef"
        :src="providerObj?.getHighResImageURL(utilizePhotoProvider(props.photoData.photoDetails))" alt="User photo" loading="lazy" @error="requestImagePhoto($event, props.photoData.provider, `${props.photoData.photoDetails.id}`)"
        :width="providerObj?.getPhotoWidth(utilizePhotoProvider(props.photoData.photoDetails))" :height="providerObj?.getPhotoHeight(utilizePhotoProvider(props.photoData.photoDetails))"
        class="blur-bg bg-clip-content p-2 w-full h-36 object-cover object-center transition-opacity rounded-md shadow-md shadow-black border-2 border-[#2227]"
        :class="{ loaded: isImgLoaded }"
    />
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
        background-color: #eee;
    }

    img.loaded  {
        opacity: 1;

    }

</style>