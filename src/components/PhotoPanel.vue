<script setup lang="ts">
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart, faSave, faDownload, faInfo } from '@fortawesome/free-solid-svg-icons';
import type PixabayPhoto from '@/types/photoItem_pixabay';

function log() {
    console.log(`TODO: Finish the method for the icon`);
}

const props = defineProps<{
    photoData: PixabayPhoto, 
}>();

const photoTags = computed(() => props.photoData.tags.split(','))

</script>

<!-- backdrop-blur-sm -->

<template>
    <div class="absolute inset-0 grid grid-rows-[1fr_auto] text-white bg-black/[.25]">
        <div class="p-[1.5rem] backdrop-blur-lg overflow-auto">
            <figure class="flex items-center justify-start pb-4">
                <img class="max-w-16 max-h-16 rounded-xl text-xs border-2" :src="photoData.userImageURL" alt="Author profile picture" />
                <figcaption class="mx-4">
                    <p class="text-sm bold"> Photo by: </p>
                    <p class="text-xl bold break-all mr-12"> {{ photoData.user }} </p>
                </figcaption>
            </figure>

            <ul class="flex flex-wrap mt-3" >
                <li class="text-base bold py-1 px-4 m-2 border-2 rounded-full"
                    v-for="tag in photoTags" :key="photoData.id + '__tag=' + tag"
                > 
                    {{ '#' + tag.trim() }} 
                </li>
            </ul>

            <FontAwesomeIcon :icon="faInfo" @click="log()" class="text-2xl absolute top-0 right-0 m-[1.5rem] border-2 px-3 py-1 rounded-full"></FontAwesomeIcon>
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