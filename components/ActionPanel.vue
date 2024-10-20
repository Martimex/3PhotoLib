<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSquarePlus, faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import { faFire, faFolder } from '@fortawesome/free-solid-svg-icons';
import { useStatusStore } from '@/stores/statusStore';
import { storeToRefs } from 'pinia';

const sStore = useStatusStore();
const { isSearchbarOpen } = storeToRefs(sStore);

function toggleSearchbar() {
    sStore.$patch({
        isSearchbarOpen: !sStore.isSearchbarOpen
    });
}

</script>


<template>
    <nav class="sticky bottom-0 left-0 right-0 text-black py-7 bg-gray-200 flex justify-around items-center">
        <NuxtLink to="/home/liked" class="w-fit">
            <FontAwesomeIcon :icon="faFire" class="text-4xl"></FontAwesomeIcon>
        </NuxtLink>
        <FontAwesomeIcon :icon="isSearchbarOpen? faSquareMinus : faSquarePlus" class="text-6xl" @click="toggleSearchbar()"></FontAwesomeIcon>
        <NuxtLink to="/home/collections" class="w-fit">
            <FontAwesomeIcon :icon="faFolder" class="text-4xl"></FontAwesomeIcon>
        </NuxtLink>
    </nav>
</template>


<style scoped>

</style>