<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faTools, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const { collectionsOrlikedPhotos_setEditMode, recentlyVisitedRouteArr } = useStatusStore();

const getRecentRoute = computed(() => (recentlyVisitedRouteArr.length > 1? recentlyVisitedRouteArr[recentlyVisitedRouteArr.length - 1] : '/home'));

const props = defineProps<{
    isContentOverflow: boolean
}>();

const collectionsEmits = defineEmits(['openEditCollection']);


function handleSetEditMode() {
    collectionsOrlikedPhotos_setEditMode(true);
}

</script>

<template>
    <nav class="bottom-0 left-0 right-0 backdrop-blur bg-[#fff5] text-[#333] py-5 flex justify-around items-center" :class="props.isContentOverflow? `sticky` : `fixed`">
        <NuxtLink :to="getRecentRoute" class="w-fit">
            <FontAwesomeIcon :icon="faArrowLeft" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee]"></FontAwesomeIcon>
        </NuxtLink>
        <FontAwesomeIcon :icon="faPenToSquare" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee]" @click="collectionsEmits('openEditCollection')" ></FontAwesomeIcon>
        <FontAwesomeIcon :icon="faTools" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee]" @click="handleSetEditMode" ></FontAwesomeIcon>
    </nav>
</template>

<style scoped>

</style>