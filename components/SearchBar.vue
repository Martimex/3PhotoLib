<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass, faGear } from '@fortawesome/free-solid-svg-icons';
import { faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import { useSearchQueryStore } from '../stores/searchQueryStore';
import { useStatusStore } from '../stores/statusStore';
import { ref, onMounted } from 'vue';
import PhotoProvider from '@/providers/photoProvidersInitializer';
import { useRoute, useRouter } from 'vue-router';
import type { requestParamsObject } from '~/types/type_utilities';

const [sqStore, sStore] = [useSearchQueryStore(), useStatusStore()];
const { queryText,  currPhotoProviderName, outputPhotosNumber, searchPageCount } = storeToRefs(sqStore);
const { availableOptionalParams } = useSearchQueryStore();

const { currentBreakpoint } = storeToRefs(useStatusStore());

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

function toggleSearchbarAndCloseAdvancedOptions() {
    sStore.$patch({
        isSearchbarOpen: !sStore.isSearchbarOpen,
        isAdvancedMenuOpen: false,
    });
}

const testBreakpoint = computed(() => { return responsiveLayoutData[currentBreakpoint.value].panels.disableBottomPanels; })

onMounted(() => { searchbar?.value?.focus() })

</script>

<template>
    <FontAwesomeIcon :icon="faGear" @click="toggleAdvancedMenu()" class="mt-1 text-3xl justify-self-start drop-shadow-[0rem_0rem_0.05rem_#eee] hover:cursor-pointer"></FontAwesomeIcon>
            <!-- <input v-model="searchText" placeholder="Looking for..." class="p-2 min-w-[50vw]" ref="searchbar" /> -->
            <!-- Another cool  input alternative - check this one out ! -->
            <div class="flex gap-x-6 items-center justify-center">
                <FontAwesomeIcon v-if="testBreakpoint" :icon="faSquareMinus" class="text-4xl drop-shadow-[0rem_0rem_0.05rem_#eee] place-self-end text-[#333a] mt-1 hover:cursor-pointer" @click="toggleSearchbarAndCloseAdvancedOptions()"></FontAwesomeIcon>
                <input v-model="searchText" placeholder="Looking for..." ref="searchbar" class="custom-text-shadow mt-1 min-w-[50vw] text-sm font-semibold text-center py-2 px-2 text-[#222] bg-inherit outline-[#222]  appearance-none cursor-text rounded-lg shadow-[0rem_0rem_0.3rem_black]
                    sm:min-w-0 sm:w-[33vw] sm:max-w-[420px]
                " />
            </div>

            <div class="" id="top-panel-teleport hidden">
                <!-- THE #top-panel-teleport DIV IS A TELEPORT TARGET. DO NOT CHANGE THE CLASSNAME AND DO NOT REMOVE THIS ELEMENT -->
            </div>

    <FontAwesomeIcon :icon="faMagnifyingGlass" @click="{ closeAdvancedMenu(); getImagesByQuery(searchText); }" class="mt-1 text-3xl justify-self-end drop-shadow-[0rem_0rem_0.05rem_#eee] hover:cursor-pointer"></FontAwesomeIcon>
</template>

<style scoped>

.custom-text-shadow {
    text-shadow: 0 0 0.1rem #eee;
}

</style>