<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass, faGear } from '@fortawesome/free-solid-svg-icons';
import { useSearchQueryStore } from '../stores/searchQueryStore';
import { useStatusStore } from '../stores/statusStore';
import { ref, onMounted } from 'vue';
import PhotoProvider from '@/providers/photoProvidersInitializer';
import { useRoute, useRouter } from 'vue-router';

const [sqStore, sStore] = [useSearchQueryStore(), useStatusStore()];

const searchText = ref('');
const searchbar = ref<HTMLInputElement | null>(null);

function getImagesByQuery(this: any, searchText: string) {
    sStore.$patch({
        isRequestPending: true
    });

    sqStore.$patch({
        queryText: searchText,
        outputPhotosNumber: sqStore.outputPhotosObj.current,
        searchPageCount: sqStore.searchPageObj.current,
        // Below prop value will be gotten from another Pinia store entity, for now it is just hardcoded value
        currPhotoProvider: new PhotoProvider(sqStore.currPhotoProviderName).setCurrentProvider(),
    });

    sStore.isAdvancedMenuOpen = sStore.isAdvancedMenuOpen && false;

    // Redirect user to /results endpoint

/*     const router = useRouter();
    router.push('Results'); */

    //this.$router.push('Results');

    //console.log(this.$router);

    /* this.$router.push({
            path: '/pagename', 
            params: {
                param1: 'value1', 
                param2: 'value2'
            }
        }); 
    */

    console.warn('Currently looking inside provider: ', sqStore.currPhotoProviderName,  '  and the provider object is: ', sqStore.currPhotoProvider);
}

function closeAdvancedMenu(): void {
    if(sStore.isAdvancedMenuOpen) sStore.isAdvancedMenuOpen = false;
}

function toggleAdvancedMenu(): void {
    console.log('isAdvancedMenuOpen: ', sStore.isAdvancedMenuOpen);
    sStore.$patch({
        isAdvancedMenuOpen: !sStore.isAdvancedMenuOpen
    });
}

onMounted(() => { searchbar?.value?.focus() })

</script>

<template>
    <FontAwesomeIcon :icon="faGear" @click="toggleAdvancedMenu()" class="text-4xl text-gray-400 place-self-start"></FontAwesomeIcon>
        <input v-model="searchText" placeholder="Looking for..." class="p-2 min-w-[50vw]" ref="searchbar" />
    <FontAwesomeIcon :icon="faMagnifyingGlass" @click="{ getImagesByQuery(searchText); closeAdvancedMenu(); $router.push('/results'); }" class="text-4xl text-gray-400 place-self-end"></FontAwesomeIcon>
</template>

<style scoped>

</style>