<script setup lang="ts">
import PhotoItem from '../../../components/PhotoItem.vue';
import { ref, onMounted } from 'vue';
import { useSearchQueryStore } from '../../../stores/searchQueryStore';
import { useStatusStore } from '../../../stores/statusStore';
import { storeToRefs } from 'pinia';
import searchPhotosByQuery from '../../../composables/searchPhotosByQuery';
import type { availablePhotoTypes, availableProviderNames, requestParamsObject } from '../../../types/type_utilities';

const [sStore, sqStore] = [useStatusStore(), useSearchQueryStore()];
const { queryText, currPhotoProvider, currPhotoProviderName, outputPhotosNumber, searchPageCount, searchPageObj } = storeToRefs(sqStore);
const { isRequestPending, isSearchbarOpen} = storeToRefs(sStore);

definePageMeta({
    middleware: 'handle-url-params'
})

const imageData = ref<availablePhotoTypes[]>([]);
const providerName = ref<availableProviderNames>(currPhotoProviderName.value);
const isNextPageAvailable = ref<boolean>(true);

async function handleSwitchPage(pageModifier: number) {
    searchPageObj.value.current = pageModifier;
    await navigateTo(`/home/results=${sqStore.queryText}&page=${sqStore.searchPageObj.current}&photos=${sqStore.outputPhotosObj.current}&provider=${sqStore.currPhotoProviderName}`)
    searchPageCount.value = pageModifier;
}

async function applyPhotos() {
    isRequestPending.value = true;
    const responsePhotos = await searchPhotosByQuery(
        {queryText: queryText.value, currPhotoProvider: currPhotoProvider.value, outputPhotosNumber: outputPhotosNumber.value, searchPageCount: searchPageCount.value},
        {isRequestPending: isRequestPending.value, pageModifier: 0}
    );
    if(responsePhotos) {
        
        if(responsePhotos.length > outputPhotosNumber.value) {
            responsePhotos.splice(outputPhotosNumber.value);
        }
        isNextPageAvailable.value = responsePhotos.length >= outputPhotosNumber.value;
        imageData.value = responsePhotos;
    }
    /* imageData.value = responsePhotos? responsePhotos : imageData.value; */
    isRequestPending.value = false;
}

onBeforeMount(async() => {
    // Executed every time we perform a search that has at least one param modified compared to the most recent search
    await applyPhotos();
});
onUnmounted(() => isSearchbarOpen.value = false);

</script>


<template>
    <NavigationBar />
    <section class="min-h-screen text-xl mx-4">
        <Transition> 
            <div v-if="isRequestPending"> <Loading /> </div>
            <div v-else-if="!imageData.length"> <NoResults /> </div>
            <div v-else-if="imageData" class="py-[10vh]">
                <p class="text-3xl font-bold text-center underline"> {{ queryText }} </p>
                <p class="text-base mt-12 mb-6 text-center"> Searching for <b>{{ outputPhotosNumber === 1? `${outputPhotosNumber} photo` : `${outputPhotosNumber} photos` }} </b> per each page. You can alter search options at any time by using the top-left gear button. </p>
                <div v-if="!isRequestPending" class="">
                    <!-- Slicing works well for providers API, which reqire minimal response photos, while this app does not  -->
                    <section class="grid grid-rows-1 grid-cols-[1fr_auto_1fr] items-center">
                        <div class="bg-black h-[0.15rem] mr-3 shadow-xl shadow-black"></div>
                        <div class="flex items-center justify-start w-fit py-3 px-6 my-8 mx-auto border-black rounded-md border-2">
                            <p class="text-xl font-semibold"> Page: {{ searchPageCount }} </p>
                        </div>
                        <div class="bg-black h-[0.15rem] ml-3 shadow-xl shadow-black"></div>
                    </section>
                    <PhotoItem v-for="image in imageData.slice(0, outputPhotosNumber)" :key="image.id" :imgData="image" :provider="providerName"/>
                    <PageNavigation @switchPage="handleSwitchPage" :isNextPageAvailable="isNextPageAvailable" />
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