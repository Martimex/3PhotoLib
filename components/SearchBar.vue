<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass, faGear } from '@fortawesome/free-solid-svg-icons';
import { useSearchQueryStore } from '../stores/searchQueryStore';
import { useStatusStore } from '../stores/statusStore';
import { ref, onMounted } from 'vue';
import PhotoProvider from '@/providers/photoProvidersInitializer';
import { useRoute, useRouter } from 'vue-router';
import type { requestParamsObject } from '~/types/type_utilities';

const [sqStore, sStore] = [useSearchQueryStore(), useStatusStore()];
const { queryText,  currPhotoProviderName, outputPhotosNumber, searchPageCount } = storeToRefs(sqStore);
const { availableOptionalParams } = useSearchQueryStore();

const searchText = ref(sqStore.queryText);
const searchbar = ref<HTMLInputElement | null>(null);

const previousRequestParams = ref<requestParamsObject>({queryText: queryText.value, currPhotoProviderName: currPhotoProviderName.value, outputPhotosNumber: outputPhotosNumber.value, searchPageCount: searchPageCount.value});

/* const previousRequestData = computed((previous) => {
    if(isRequestSameAsRecentOne() && previous) {
        return previous;
    } else return {queryText: queryText.value, currPhotoProviderName: currPhotoProviderName.value, outputPhotosNumber: outputPhotosNumber.value, searchPageCount: searchPageCount.value} 
}) */

const isRequestSameAsRecentOne = function(): boolean {
    if(previousRequestParams.value.searchPageCount !== searchPageCount.value) { return false; }
    if(previousRequestParams.value.outputPhotosNumber !== outputPhotosNumber.value) { return false; }
    if(previousRequestParams.value.currPhotoProviderName !== currPhotoProviderName.value) { return false; }
    if(previousRequestParams.value.queryText !== queryText.value) { return false; }
    return true; 
}


async function getImagesByQuery(this: any, sText: string) {
    sStore.$patch({
        isRequestPending: true
    });

    // Purge the text value from ampersand (&) marks and trim the search text value to the very first occurence of this mark
    if(searchText.value.indexOf('&') >= 0) {
        sText = searchText.value.slice(0, searchText.value.indexOf('&'));
    }
    
    sqStore.$patch({
        queryText: sText,
        outputPhotosNumber: sqStore.outputPhotosObj.current,
        searchPageCount: sqStore.searchPageObj.current,
        // Below prop value will be gotten from another Pinia store entity, for now it is just hardcoded value
        currPhotoProvider: new PhotoProvider(sqStore.currPhotoProviderName).setCurrentProvider(),
    });

    if(isRequestSameAsRecentOne()) {
        sStore.$patch({
            isRequestPending: false
        });
        return;
    }

    sStore.isAdvancedMenuOpen = sStore.isAdvancedMenuOpen && false;

    // Redirect user to /results endpoint
    await navigateTo(`/home/results=${sText}&page=${sqStore.searchPageObj.current}&photos=${sqStore.outputPhotosObj.current}&provider=${sqStore.currPhotoProviderName}`)


/*     const router = useRouter();
    router.push('Results'); */

    //this.$router.push('Results');

    /* this.$router.push({
            path: '/pagename', 
            params: {
                param1: 'value1', 
                param2: 'value2'
            }
        }); 
    */

}

function closeAdvancedMenu(): void {
    if(sStore.isAdvancedMenuOpen) sStore.isAdvancedMenuOpen = false;
}

function toggleAdvancedMenu(): void {
    sStore.$patch({
        isAdvancedMenuOpen: !sStore.isAdvancedMenuOpen
    });
}

onMounted(() => { searchbar?.value?.focus() })

</script>

<template>
    <FontAwesomeIcon :icon="faGear" @click="toggleAdvancedMenu()" class="mt-1 text-3xl text-gray-400 justify-self-start"></FontAwesomeIcon>
            <!-- <input v-model="searchText" placeholder="Looking for..." class="p-2 min-w-[50vw]" ref="searchbar" /> -->
            <!-- Another cool  input alternative - check this one out ! -->
            <input v-model="searchText" placeholder="Looking for..." class="mt-1 min-w-[50vw] text-sm font-semibold text-center py-2 px-2 text-[#333] outline-gray-500  appearance-none cursor-pointer rounded-lg shadow-[0rem_0rem_0.2rem_black]" ref="searchbar" />
    <FontAwesomeIcon :icon="faMagnifyingGlass" @click="{ closeAdvancedMenu(); getImagesByQuery(searchText); }" class="mt-1 text-3xl text-gray-400 justify-self-end"></FontAwesomeIcon>
</template>

<style scoped>

</style>