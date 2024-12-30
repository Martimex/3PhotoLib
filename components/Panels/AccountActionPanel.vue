<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { NavbarPosition } from '~/types/type_utilities';

const props = defineProps<{
    isContentOverflow: boolean,
    disableBlur?: boolean
}>();

const emits = defineEmits(['tryToLogOut']);
const { recentlyVisitedRouteArr } = useStatusStore();
const { currentBreakpoint } = storeToRefs(useStatusStore());

const getRecentRoute = computed(() => (recentlyVisitedRouteArr.length > 1? recentlyVisitedRouteArr[recentlyVisitedRouteArr.length - 1] : '/home'));
const setNavbarPositionClass = computed(() => getNavbarPositionClass(currentBreakpoint.value));

</script>

<template>
    <nav class="flex justify-around items-center" :class="[setNavbarPositionClass, getNavbarStyleClasses(NavbarPosition.BOTTOM, props.disableBlur)]">
        <NuxtLink :to="getRecentRoute" class="w-fit">
            <FontAwesomeIcon :icon="faArrowLeft" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee]"></FontAwesomeIcon>
        </NuxtLink>
        <NuxtLink :to="`https://github.com/Martimex/3PhotoLib#the-purpose-of-an-app`" target="_blank" class="w-fit">
            <FontAwesomeIcon :icon="faQuestionCircle" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee]"></FontAwesomeIcon>
        </NuxtLink>
        <FontAwesomeIcon :icon="faSignOut" @click="emits('tryToLogOut')" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee]"></FontAwesomeIcon>
    </nav>
</template>

<style scoped>

</style>