<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faTools } from '@fortawesome/free-solid-svg-icons';

const { collectionsOrlikedPhotos_setEditMode, recentlyVisitedRouteArr } = useStatusStore();

const getRecentRoute = computed(() => (recentlyVisitedRouteArr.length > 1? recentlyVisitedRouteArr[recentlyVisitedRouteArr.length - 1] : '/home'));

const props = defineProps<{
    isContentOverflow: boolean
}>();

function handleSetEditMode() {
    collectionsOrlikedPhotos_setEditMode(true);
}

</script>

<template>
    <nav class="bottom-0 left-0 right-0 backdrop-blur bg-[#fff5] text-[#444] py-5 flex justify-around items-center" :class="props.isContentOverflow? `sticky` : `fixed`" >
        <NuxtLink :to="getRecentRoute" class="w-fit">
            <FontAwesomeIcon :icon="faArrowLeft" class="text-3xl"></FontAwesomeIcon>
        </NuxtLink>
        <FontAwesomeIcon :icon="faTools" class="text-3xl" @click="handleSetEditMode" ></FontAwesomeIcon>
    </nav>
</template>

<style scoped>

</style>