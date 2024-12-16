<script setup lang="ts">
import FeaturedPhotosSkeleton from '@/components/FeaturedPhotosSkeleton.vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import type { availablePhotoTypes, availableProviderNames } from '@/types/type_utilities';
import { availableProviderNames_Array, featuredCategories } from '@/types/type_utilities';
import PhotoProvider from '~/providers/photoProvidersInitializer';



const { currentUser_get } = useAuthStore();
const [sStore, sqStore] = [useStatusStore(), useSearchQueryStore()];
const { queryText, currPhotoProvider } = storeToRefs(sqStore);
const { isRequestPending, isSearchbarOpen } = storeToRefs(sStore);

const featuredPhotosResultsMax = ref(3);

const { featuredPhotosCategory, featuredPhotosProviderName } = storeToRefs(usePhotoStore());

const featuredImages = ref<availablePhotoTypes[]>([]);
const providerName = ref<availableProviderNames>('pixabay');

onBeforeMount(async() => {
    if(!featuredPhotosCategory.value) { featuredPhotosCategory.value = featuredCategories[Math.floor(Math.random() * featuredCategories.length)]};
    if(!featuredPhotosProviderName.value) { featuredPhotosProviderName.value = availableProviderNames_Array[Math.floor(Math.random() * availableProviderNames_Array.length)]};

    const featuredPhotosArr = await searchPhotosByQuery(
        {queryText: featuredPhotosCategory.value, currPhotoProvider: new PhotoProvider(featuredPhotosProviderName.value).setCurrentProvider(), outputPhotosNumber: 10, searchPageCount: 1},
        {isRequestPending: true }
    );
    
    providerName.value = featuredPhotosProviderName.value;
    if(featuredPhotosArr) { featuredImages.value = featuredPhotosArr }
})

onUnmounted(() => isSearchbarOpen.value = false);

</script>


<template>
    <NavigationBar />
    <section class="min-h-screen text-xl mx-4 py-[10vh]">
        <h1 class="text-3xl mb-24 bold text-center break-all
            lg:text-5xl
        "> Hello, {{ currentUser_get()?.name }} </h1>
        <p class="text-2xl font-semibold my-8 text-center
            lg:my-12
        "> [ Featured photos ] </p>
        <Suspense>
            <template #default>
                <ResultPhotosContainer :photosArray="featuredImages" :providerName="providerName" />
            </template>
            <template #fallback>
                <FeaturedPhotosSkeleton :skeletonsCount="featuredPhotosResultsMax" />
            </template>
        </Suspense>
    
    </section>
    <ActionPanel />
</template>


<style scoped>

</style>