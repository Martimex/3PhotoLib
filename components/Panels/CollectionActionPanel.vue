<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faTools, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const { collectionsOrlikedPhotos_setEditMode, recentlyVisitedRouteArr } = useStatusStore();

const getRecentRoute = computed(() => (recentlyVisitedRouteArr.length > 1? recentlyVisitedRouteArr[recentlyVisitedRouteArr.length - 1] : '/home'));


const collectionsEmits = defineEmits(['openEditCollection']);


function handleSetEditMode() {
    collectionsOrlikedPhotos_setEditMode(true);
}

</script>

<template>
    <nav class="sticky bottom-0 left-0 right-0 text-black py-5 bg-gray-200 flex justify-around items-center">
        <NuxtLink :to="getRecentRoute" class="w-fit">
            <FontAwesomeIcon :icon="faArrowLeft" class="text-3xl"></FontAwesomeIcon>
        </NuxtLink>
        <FontAwesomeIcon :icon="faPenToSquare" class="text-3xl" @click="collectionsEmits('openEditCollection')" ></FontAwesomeIcon>
        <FontAwesomeIcon :icon="faTools" class="text-3xl" @click="handleSetEditMode" ></FontAwesomeIcon>
    </nav>
</template>

<style scoped>

</style>