<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faSignOut, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const props = defineProps<{
    isContentOverflow: boolean
}>();

const emits = defineEmits(['tryToLogOut']);
const { recentlyVisitedRouteArr } = useStatusStore();

const getRecentRoute = computed(() => (recentlyVisitedRouteArr.length > 1? recentlyVisitedRouteArr[recentlyVisitedRouteArr.length - 1] : '/home'));

</script>

<template>
    <nav class="bottom-0 left-0 right-0 text-black py-5 bg-gray-200 flex justify-around items-center" :class="props.isContentOverflow? `sticky` : `fixed`">
        <NuxtLink :to="getRecentRoute" class="w-fit">
            <FontAwesomeIcon :icon="faArrowLeft" class="text-3xl"></FontAwesomeIcon>
        </NuxtLink>
        <FontAwesomeIcon :icon="faPenToSquare" class="text-3xl"></FontAwesomeIcon>
        <FontAwesomeIcon :icon="faSignOut" @click="emits('tryToLogOut')" class="text-3xl"></FontAwesomeIcon>
    </nav>
</template>

<style scoped>

</style>