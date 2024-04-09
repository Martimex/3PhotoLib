<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSearchQueryStore } from '../stores/searchQueryStore';
import { useStatusStore } from '../stores/statusStore';
import { ref, onMounted } from 'vue';
import PhotoProvider from '@/providers/photoProvidersInitializer';

const [sqStore, sStore] = [useSearchQueryStore(), useStatusStore()];

const searchText = ref('');
const searchbar = ref<HTMLInputElement | null>(null);

function getImagesByQuery(searchText: string) {
    sStore.$patch({
        isRequestPending: true
    });

    sqStore.$patch({
        queryText: searchText,
        // Below prop value will be gotten from another Pinia store entity, for now it is just hardcoded value
        currPhotoProvider: new PhotoProvider('pexels').setCurrentProvider(),
    });
}

function closeSearchbar() {
    sStore.$patch({
        isSearchbarOpen: false
    });
}

onMounted(() => { searchbar?.value?.focus() })

</script>

<template>
    <FontAwesomeIcon :icon="faXmark" @click="closeSearchbar()" class="text-4xl text-red-400 place-self-start"></FontAwesomeIcon>
    <input v-model="searchText" placeholder="Looking for..." class="p-2 min-w-[50vw]" ref="searchbar" />
    <FontAwesomeIcon :icon="faMagnifyingGlass" @click="getImagesByQuery(searchText)" class="text-4xl text-gray-400 place-self-end"></FontAwesomeIcon>
</template>

<style scoped>

</style>