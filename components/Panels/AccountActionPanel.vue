<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

const props = defineProps<{
    isContentOverflow: boolean
}>();

const emits = defineEmits(['tryToLogOut']);
const { recentlyVisitedRouteArr } = useStatusStore();

const getRecentRoute = computed(() => (recentlyVisitedRouteArr.length > 1? recentlyVisitedRouteArr[recentlyVisitedRouteArr.length - 1] : '/home'));

</script>

<template>
    <nav class="bottom-0 left-0 right-0 backdrop-blur bg-[#fff5] text-[#333] py-5 flex justify-around items-center" :class="props.isContentOverflow? `sticky` : `fixed`">
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