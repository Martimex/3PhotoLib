<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NavbarPosition } from '~/types/type_utilities';

const { recentlyVisitedRouteArr } = useStatusStore();
const { currentBreakpoint } = storeToRefs(useStatusStore());

const props = defineProps<{
    isContentOverflow: boolean,
    disableBlur?: boolean
}>();

const getRecentRoute = computed(() => (recentlyVisitedRouteArr.length > 1? recentlyVisitedRouteArr[recentlyVisitedRouteArr.length - 1] : '/home'));
const setNavbarPositionClass = computed(() => getNavbarPositionClass(currentBreakpoint.value));

const collectionsEmits = defineEmits(['openAddCollection']);

</script>

<template>
    <nav class="flex justify-around items-center" :class="[setNavbarPositionClass, getNavbarStyleClasses(NavbarPosition.BOTTOM, props.disableBlur)]">
        <NuxtLink :to="getRecentRoute" class="w-fit">
            <FontAwesomeIcon :icon="faArrowLeft" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee]"></FontAwesomeIcon>
        </NuxtLink>
        <FontAwesomeIcon :icon="faPlus" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee]" @click="collectionsEmits('openAddCollection')"></FontAwesomeIcon>
    </nav>
</template>

<style scoped>

</style>