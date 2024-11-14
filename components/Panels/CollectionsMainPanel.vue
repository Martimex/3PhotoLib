<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

const { recentlyVisitedRouteArr } = useStatusStore();

const props = defineProps<{
    isContentOverflow: boolean
}>();

const getRecentRoute = computed(() => (recentlyVisitedRouteArr.length > 1? recentlyVisitedRouteArr[recentlyVisitedRouteArr.length - 1] : '/home'));

const collectionsEmits = defineEmits(['openAddCollection']);

</script>

<template>
    <nav class="bottom-0 left-0 right-0 text-black py-5 bg-gray-200 flex justify-around items-center" :class="props.isContentOverflow? `sticky` : `fixed`">
        <NuxtLink :to="getRecentRoute" class="w-fit">
            <FontAwesomeIcon :icon="faArrowLeft" class="text-3xl"></FontAwesomeIcon>
        </NuxtLink>
        <FontAwesomeIcon :icon="faPlus" class="text-3xl" @click="collectionsEmits('openAddCollection')"></FontAwesomeIcon>
    </nav>
</template>

<style scoped>

</style>