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
    <div class="mt-6 mb-16" >
        <div class="grid grid-rows-1 grid-cols-[1fr_auto_1fr] items-center">
            <div class="bg-black h-[0.15rem] mr-3 shadow-xl shadow-black"></div>
            <h2 class="text-2xl font-semibold text-wrap break-all my-2 text-center border-black rounded-full border-2 py-2 px-4 shadow-[0.25rem_0.25rem_0.3rem_#222d]"> {{ props.collectionData.name }}</h2>
            <div class="bg-black h-[0.15rem] ml-3 shadow-xl shadow-black"></div>
        </div>
        <div class="grid grid-rows-[auto_auto] grid-cols-[auto_1fr] my-4 gap-x-9 gap-y-6">
            <NuxtLink :to="{name: 'home-collections-id', params: { id: props.collectionData.releaseId}}" >
                <FontAwesomeIcon :icon="faFolder" class="text-[25vw] width-full block drop-icon m-auto px-1 drop-shadow-[0.25rem_0.25rem_0.3rem_#222d]" :class="`text-[${props.collectionData.folderColor}]`" 
                    @click="emits(`setCollectionAsViewed`)"
                >
                </FontAwesomeIcon>
            </NuxtLink>
            <div class="flex flex-col align-start justify-center">
                <span class="text-lg block"> Author: <p class="text-lg font-semibold inline"> {{ collectionOwnerName }} </p> </span>
                <span class="text-lg block"> Created at: <p class="text-lg font-semibold inline"> {{ props.collectionData.collectionDetails.createdAt }} </p> </span>
                <span class="text-lg block"> Collection size: <p class="text-lg font-semibold inline"> {{ props.collectionData.collectionPhotos.length }} / 50 </p> </span>
            </div>
            <p class="text-4xl font-light text-center text-[#444]  _custom-text-shadow"> #{{ props.collectionData.releaseId }} </p>
            <div class="grid grid-rows-1 grid-cols-[1fr_1fr] items-center">
                <NuxtLink :to="{name: 'home-collections-id', params: { id: props.collectionData.releaseId}}" class="w-fit" >
                    <FontAwesomeIcon :icon="faExternalLinkSquareAlt" class="text-4xl block drop-icon  px-1 drop-shadow-[0.1rem_0.1rem_0.2rem_#222d]" :class="`text-green-200`" 
                        @click="emits(`setCollectionAsViewed`)"
                    >
                    </FontAwesomeIcon>
                </NuxtLink>
                <FontAwesomeIcon :icon="faMinusCircle" class="text-4xl block drop-icon px-1 drop-shadow-[0.1rem_0.1rem_0.2rem_#222d]" :class="`text-red-200`" 
                        @click="emits('tryToDeleteCollection')"
                    >
                </FontAwesomeIcon>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>