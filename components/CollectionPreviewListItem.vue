<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faFolder, faMinusCircle, faInfoCircle, faShareAltSquare, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
    import type CollectionResponseModel from '~/types/responseModel_collection';

    const props = defineProps<{
        collectionData: CollectionResponseModel,
    }>();

    const emits = defineEmits(['setCollectionAsViewed', 'tryToDeleteCollection'])

    const { currentUser_get } = useAuthStore();

    const collectionOwnerName = ref(currentUser_get()?.name);

</script>

<template>
    <div class="mt-6 mb-10
        sm:mx-auto sm:mb-8
    " >
        <div class="grid grid-rows-1 grid-cols-[1fr_auto_1fr] items-center
            sm:grid-cols-1
        ">
            <div class="bg-black h-[0.15rem] mr-3 shadow-xl shadow-black
                sm:invisible
            "></div>
            <h2 class="text-lg font-semibold text-wrap break-all my-2 text-center border-black rounded-full border-2 py-2 px-4 shadow-[0.25rem_0.25rem_0.3rem_#222d]
                sm:w-[80%] sm:mx-auto
            "> {{ props.collectionData.name }}</h2>
            <div class="bg-black h-[0.15rem] ml-3 shadow-xl shadow-black
                sm:invisible
            "></div>
        </div>
        <div class="grid grid-rows-[auto_auto] grid-cols-[auto_1fr] my-4 gap-x-9 gap-y-6">
            <NuxtLink :to="{name: 'home-collections-id', params: { id: props.collectionData.releaseId}}" >
                <FontAwesomeIcon :icon="faFolder" @click="emits(`setCollectionAsViewed`)" :class="`text-[${props.collectionData.folderColor}]`" class="text-[25vw] width-full block drop-icon m-auto px-1 drop-shadow-[0.25rem_0.25rem_0.3rem_#222d]
                    sm:text-[5rem]
                    md:text-[6rem]
                    lg:text-[7rem]
                ">
                </FontAwesomeIcon>
            </NuxtLink>
            <div class="flex flex-col align-start justify-center">
                <span class="text-base block"> Author: <p class="text-base font-semibold inline"> {{ collectionOwnerName }} </p> </span>
                <span class="text-base block"> Created at: <p class="text-base font-semibold inline"> {{ props.collectionData.collectionDetails.createdAt }} </p> </span>
                <span class="text-base block"> Collection size: <p class="text-base font-semibold inline"> {{ props.collectionData.collectionPhotos.length }} / 50 </p> </span>
            </div>
            <p class="text-4xl font-light text-center text-[#444]"> #{{ props.collectionData.releaseId }} </p>
            <div class="grid grid-rows-1 grid-cols-[1fr_1fr] items-center">
                <NuxtLink :to="{name: 'home-collections-id', params: { id: props.collectionData.releaseId}}" class="w-fit" >
                    <FontAwesomeIcon :icon="faExternalLinkSquareAlt" class="text-4xl block drop-icon  px-1 drop-shadow-[0.1rem_0.1rem_0.2rem_#222d] hover:cursor-pointer" :class="`text-green-200`" 
                        @click="emits(`setCollectionAsViewed`)"
                    >
                    </FontAwesomeIcon>
                </NuxtLink>
                <FontAwesomeIcon :icon="faMinusCircle" class="text-4xl block drop-icon px-1 drop-shadow-[0.1rem_0.1rem_0.2rem_#222d] hover:cursor-pointer" :class="`text-red-200`" 
                        @click="emits('tryToDeleteCollection')"
                    >
                </FontAwesomeIcon>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>