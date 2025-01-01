<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faTools, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { NavbarPosition } from '~/types/type_utilities';

const { collectionsOrlikedPhotos_setEditMode, recentlyVisitedRouteArr } = useStatusStore();
const { currentBreakpoint } = storeToRefs(useStatusStore());

const getRecentRoute = computed(() => (recentlyVisitedRouteArr.length > 1? recentlyVisitedRouteArr[recentlyVisitedRouteArr.length - 1] : '/home'));
const setNavbarPositionClass = computed(() => getNavbarPositionClass(currentBreakpoint.value));

const props = defineProps<{
    isContentOverflow: boolean
    disableBlur?: boolean
}>();

const collectionsEmits = defineEmits(['openEditCollection']);


function handleSetEditMode() {
    collectionsOrlikedPhotos_setEditMode(true);
}

</script>

<template>
    <nav class="flex justify-around items-center" :class="[setNavbarPositionClass, getNavbarStyleClasses(NavbarPosition.BOTTOM, props.disableBlur)]">
        <NuxtLink :to="getRecentRoute" class="w-fit">
            <FontAwesomeIcon :icon="faArrowLeft" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee] hover:cursor-pointer"></FontAwesomeIcon>
        </NuxtLink>
        <FontAwesomeIcon :icon="faPenToSquare" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee] hover:cursor-pointer" @click="collectionsEmits('openEditCollection')" ></FontAwesomeIcon>
        <FontAwesomeIcon :icon="faTools" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee] hover:cursor-pointer" @click="handleSetEditMode" ></FontAwesomeIcon>
    </nav>
</template>

<style scoped>

</style>