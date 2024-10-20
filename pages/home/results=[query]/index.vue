<script setup lang="ts">
import PhotoItem from '../../../components/PhotoItem.vue';
import { ref, onMounted } from 'vue';
import { useSearchQueryStore } from '../../../stores/searchQueryStore';
import { useStatusStore } from '../../../stores/statusStore';
import { storeToRefs } from 'pinia';
import type { availablePhotoTypes, availableProviderNames } from '../../../types/type_utilities';

const [sStore, sqStore] = [useStatusStore(), useSearchQueryStore()];
const { queryText, currPhotoProvider, currPhotoProviderName, outputPhotosNumber, searchPageCount } = storeToRefs(sqStore);
const { isRequestPending, isSearchbarOpen} = storeToRefs(sStore);

definePageMeta({
    middleware: 'handle-url-params'
})

const imageData = ref<availablePhotoTypes[]>([]);
const providerName = ref<availableProviderNames>(currPhotoProviderName.value);

// For Pexels only, the search "red" causes no result being displayed and result in weird errors. Investigate this issue further !

sqStore.$subscribe(async() => {
    if(currPhotoProvider.value === undefined || !currPhotoProvider.value) return; // This line silences error where TS complies that x (Provider Name) can be possibly undefined
    const initialPageRequestData = await fetch(currPhotoProvider.value.getSearchRequestURL(queryText.value, outputPhotosNumber.value, 1), {headers: currPhotoProvider.value.getSearchRequestHeaders()})
        .then(res => res? res.json() : '')
        .then(data => data)
        .catch(err => { throw new Error('An error has occured: ', err) })
    
    if(searchPageCount.value === 1) {
        imageData.value = currPhotoProvider.value.getResponsePhotos(initialPageRequestData);
    } else {
        // User picked page number is higher than 1 -> perform calculations if requested page number even exists. If so, provide
        // results for the page. Otherwise, return the latest page that contain photos + inform user about the behaviour
        const maxPageForRequest = currPhotoProvider.value.getMaxPageNumber(initialPageRequestData, outputPhotosNumber.value);
        const searchPageFinal = (maxPageForRequest < searchPageCount.value)? maxPageForRequest : searchPageCount.value;

        const finalSearchPageRequestData = await fetch(currPhotoProvider.value.getSearchRequestURL(queryText.value, outputPhotosNumber.value, searchPageFinal), {headers: currPhotoProvider.value.getSearchRequestHeaders()})
            .then(res => res.json())
            .then(data => data)
            .catch(err => { throw new Error('An error has occured: ', err) })
        
            imageData.value = currPhotoProvider.value.getResponsePhotos(finalSearchPageRequestData);
    }

    // Because we performed an above, initial data request, now we know how many photos are available, and thus what is the latest
    // possible page that contains at least 1 photo - useful in cases where user selects too big "page number" option that would not
    // return any results. In such situation, user will be shown the very last page that contains any images

    // After fetching data, resolve status as non-pending
    isRequestPending.value = false;
});

async function getPhotos() {
    if(currPhotoProvider.value === undefined || !currPhotoProvider.value) return; // This line silences error where TS complies that x (Provider Name) can be possibly undefined

    await fetch(currPhotoProvider.value.getSearchRequestURL(queryText.value, outputPhotosNumber.value, searchPageCount.value), {headers: currPhotoProvider.value.getSearchRequestHeaders()})
        .then(res => { return res.json(); })
        // Used " currPhotoProvider.value! " below, beause we checked above already that the  currPhotoProvider.value is NOT undefined
        .then(data => { imageData.value =  currPhotoProvider.value!.getResponsePhotos(data); })
        .catch(err => { throw new Error('An error has occured: ', err) });

    // After fetching data, resolve status as non-pending
    isRequestPending.value = false;
}

onMounted(() => getPhotos());
onUnmounted(() => isSearchbarOpen.value = false);

</script>


<template>
    <NavigationBar />
    <section class="min-h-screen text-xl mx-4">
        <Transition> 
            <div v-if="isRequestPending"> <Loading /> </div>
            <div v-else-if="!imageData.length"> <NoResults /> </div>
            <div v-else-if="imageData" class="py-[10vh]">
                <p class="text-4xl mb-8 bold"> Results for: "{{ queryText }}" </p>
                <div v-if="!isRequestPending" class="">
                    <!-- Slicing works well for providers API, which reqire minimal response photos, while this app does not  -->
                    <PhotoItem v-for="image in imageData.slice(0, outputPhotosNumber)" :key="image.id" :imgData="image" :provider="providerName"/>
                </div>
                <div v-if="isRequestPending" class="">
                    <p class="text-2xl bold text-yellow-400"> Pending... Please wait 🥰</p>
                </div>
            </div>
        </Transition>
    </section>
    <ActionPanel />
</template>


<style scoped>

.v-enter-active,
.v-leave-active {
    transition: opacity 400ms ease;
}
.v-enter-from,
.v-leave-to {
    opacity: 0;
}

</style>