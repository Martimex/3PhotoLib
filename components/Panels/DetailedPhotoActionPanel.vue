<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const { recentlyVisitedRouteArr } = useStatusStore();

const getRecentRoute = computed(() => (recentlyVisitedRouteArr.length > 1? recentlyVisitedRouteArr[recentlyVisitedRouteArr.length - 1] : '/home'));

</script>

<template>
    <nav class="sticky bottom-0 left-0 right-0 text-black py-5 bg-gray-200 flex justify-around items-center">
        <NuxtLink :to="getRecentRoute" class="w-fit">
            <FontAwesomeIcon :icon="faArrowLeft" class="text-3xl"></FontAwesomeIcon>
        </NuxtLink>
    </nav>
</template>

<style scoped>

</style>