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
    <nav class="bottom-0 left-0 right-0 backdrop-blur bg-[#fff5] text-[#333] py-5 flex justify-around items-center" :class="props.isContentOverflow? `sticky` : `fixed`">
        <NuxtLink :to="getRecentRoute" class="w-fit">
            <FontAwesomeIcon :icon="faArrowLeft" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee]"></FontAwesomeIcon>
        </NuxtLink>
        <FontAwesomeIcon :icon="faPlus" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee]" @click="collectionsEmits('openAddCollection')"></FontAwesomeIcon>
    </nav>
</template>

<style scoped>

</style>