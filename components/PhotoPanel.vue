<script setup lang="ts">
import { utilizePhotoProvider } from '@/types/type_utilities';
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart, faSave, faDownload, faInfo } from '@fortawesome/free-solid-svg-icons';
import type PixabayPhoto from '@/types/photoItem_pixabay';
import type PexelsPhoto from '@/types/photoItem_pexels';
import { useSearchQueryStore } from '@/stores/searchQueryStore';
import { usePhotoStore } from '@/stores/photosStore';
import { storeToRefs } from 'pinia';
import type { availablePhotoTypes } from '@/types/type_utilities';

function log() {
    console.log(`TODO: Finish the method for the icon`);
}

const [sqStore, psStore] = [useSearchQueryStore(), usePhotoStore()];
const { currPhotoProvider } = storeToRefs(sqStore);
const { viewedPhoto } = storeToRefs(psStore);

function setPhotoAsViewed() {
    viewedPhoto.value = props.imgData;
}

const props = defineProps<{
    imgData: availablePhotoTypes,
}>();

const photoTags = computed(() => currPhotoProvider.value?.retrievePhotoTags(utilizePhotoProvider(props.imgData)))

</script>

<!-- backdrop-blur-sm -->

<template>
    <div class="absolute inset-0 grid grid-rows-[1fr_auto] text-white bg-black/[.25]">
        <div class="p-[1.5rem] backdrop-blur-lg overflow-auto">
            <figure class="flex items-center justify-start pb-4">
                <img class="w-16 h-16 rounded-xl text-xs border-2" :src="currPhotoProvider?.getPhotoAuthorImage(utilizePhotoProvider(props.imgData))" alt="Author profile picture" />
                <figcaption class="mx-4">
                    <p class="text-sm bold"> Photo by: </p>
                    <p class="text-xl bold break-all mr-12"> {{ currPhotoProvider?.getPhotoAuthorName(utilizePhotoProvider(props.imgData)) }} </p>
                </figcaption>
            </figure>

            <ul class="flex flex-wrap mt-3" >
                <li class="text-base bold py-1 px-4 m-2 border-2 rounded-full"
                    v-for="tag in photoTags" :key="imgData.id + '__tag=' + tag"
                > 
                    {{ '#' + tag.trim() }} 
                </li>
            </ul>

            <NuxtLink :to="{ name: 'home-results-provider=id', params: {id: currPhotoProvider?.getPhotoId(utilizePhotoProvider(props.imgData)), provider: currPhotoProvider?.name} }"> 
                <FontAwesomeIcon :icon="faInfo" @click="setPhotoAsViewed()" class="text-2xl absolute top-0 right-0 m-[1.5rem] border-2 px-3 py-1 rounded-full"></FontAwesomeIcon>
            </NuxtLink>
        </div>

        <div class="py-[1rem] px-[1rem] flex w-full items-end justify-between backdrop-blur-md
            border-t-2 border-white shadow-[0rem_-.25rem_.5rem_0rem_#fffa]
        ">
            <FontAwesomeIcon :icon="faHeart" @click="log()" class="text-3xl mx-[1.5rem] place-self-start"></FontAwesomeIcon>
            <FontAwesomeIcon :icon="faDownload" @click="log()" class="text-3xl mx-[1.5rem] place-self-start"></FontAwesomeIcon>
            <FontAwesomeIcon :icon="faSave" @click="log()" class="text-3xl mx-[1.5rem] place-self-start"></FontAwesomeIcon>
        </div>
    </div>
    
</template>

<style scoped>

</style>