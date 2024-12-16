<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSquarePlus, faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import { faFire, faFolder } from '@fortawesome/free-solid-svg-icons';
import { useStatusStore } from '@/stores/statusStore';
import { storeToRefs } from 'pinia';
import { NavbarPosition } from '~/types/type_utilities';

const sStore = useStatusStore();
const { isSearchbarOpen } = storeToRefs(sStore);

function toggleSearchbar() {
    sStore.$patch({
        isSearchbarOpen: !sStore.isSearchbarOpen
    });
}

</script>


<template>
    <nav class="sticky flex justify-around items-center" :class="getNavbarStyleClasses(NavbarPosition.BOTTOM)" >
        <NuxtLink to="/home/liked" class="w-fit">
            <FontAwesomeIcon :icon="faFire" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee]"></FontAwesomeIcon>
        </NuxtLink>
        <FontAwesomeIcon :icon="isSearchbarOpen? faSquareMinus : faSquarePlus" class="text-4xl drop-shadow-[0rem_0rem_0.05rem_#eee]" @click="toggleSearchbar()"></FontAwesomeIcon>
        <NuxtLink to="/home/collections" class="w-fit">
            <FontAwesomeIcon :icon="faFolder" class="text-3xl drop-shadow-[0rem_0rem_0.05rem_#eee]"></FontAwesomeIcon>
        </NuxtLink>
    </nav>
</template>


<style scoped>

</style>