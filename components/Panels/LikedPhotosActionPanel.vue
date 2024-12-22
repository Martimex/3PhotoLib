<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faTools } from '@fortawesome/free-solid-svg-icons';
import { NavbarPosition } from '~/types/type_utilities';

const { collectionsOrlikedPhotos_setEditMode, recentlyVisitedRouteArr } = useStatusStore();

const getRecentRoute = computed(() => (recentlyVisitedRouteArr.length > 1? recentlyVisitedRouteArr[recentlyVisitedRouteArr.length - 1] : '/home'));

const props = defineProps<{
    isContentOverflow: boolean,
    disableBlur?: boolean
}>();

function handleSetEditMode() {
    collectionsOrlikedPhotos_setEditMode(true);
}

</script>

<template>
    <nav class="flex justify-around items-center" :class="[props.isContentOverflow? `sticky` : `fixed`, getNavbarStyleClasses(NavbarPosition.BOTTOM, props.disableBlur)]" >
        <NuxtLink :to="getRecentRoute" class="w-fit">
            <FontAwesomeIcon :icon="faArrowLeft" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee]"></FontAwesomeIcon>
        </NuxtLink>
        <FontAwesomeIcon :icon="faTools" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee]" @click="handleSetEditMode" ></FontAwesomeIcon>
    </nav>
</template>

<style scoped>

</style>