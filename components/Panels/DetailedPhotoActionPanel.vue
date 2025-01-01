<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NavbarPosition } from '~/types/type_utilities';

const { recentlyVisitedRouteArr } = useStatusStore();

const props = defineProps<{
    disableBlur?: boolean,
}>();

const getRecentRoute = computed(() => (recentlyVisitedRouteArr.length > 1? recentlyVisitedRouteArr[recentlyVisitedRouteArr.length - 1] : '/home'));

</script>

<template>
    <nav class="sticky flex justify-around items-center" :class="getNavbarStyleClasses(NavbarPosition.BOTTOM, props.disableBlur)">
        <NuxtLink :to="getRecentRoute" class="w-fit">
            <FontAwesomeIcon :icon="faArrowLeft" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee] hover:cursor-pointer"></FontAwesomeIcon>
        </NuxtLink>
    </nav>
</template>

<style scoped>

</style>