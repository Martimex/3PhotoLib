<script setup lang="ts">
import { faXmark, faFaceFrownOpen } from '@fortawesome/free-solid-svg-icons';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useSearchQueryStore } from '@/stores/searchQueryStore';
import { storeToRefs } from 'pinia';

const sqStore = useSearchQueryStore();
const { queryText, searchPageCount, outputPhotosNumber } = storeToRefs(sqStore);
const { isSearchbarOpen } = storeToRefs(useStatusStore());

const maxQueryDisplayLength = ref<number>(16);
const rootElement = ref<HTMLDivElement | null>(null);

function provideTip(): string {
    if(searchPageCount.value > 1) return `Try to decrease page number to 1`;
    if(outputPhotosNumber.value > 1) return `Try to lower photos output amount to 1`;
    return `Try to change the search phrase to a different value`;
}

onMounted(() => isSearchbarOpen.value = true );
onUnmounted(() => isSearchbarOpen.value = false );

</script>

<template>
    <section ref="rootElement" class="transition-opacity duration-500 delay-200 flex flex-col items-center justify-center min-h-full fixed top-[45%] left-[50%] mr-[-50%] -translate-x-2/4 -translate-y-2/4
        sm:top-[50%]
    ">
        <FontAwesomeIcon :icon="faXmarkCircle" class="text-9xl text-gray-200 mt-10 mb-10
            sm:mb-6
            lg:mb-10 lg:text-[10rem]
        "/>
        <div class="mx-6 text-gray-300 font-semibold flex flex-col items-center gap-y-4">
            <p class="text-base text-center"> No results found for:  
                <span class="text-base text-center font-bold">  {{ queryText.slice(0, maxQueryDisplayLength) + (Boolean(queryText.length > maxQueryDisplayLength)? '...' : '')}}  </span>  <!-- If query text length is longer than 20 chars, we will trim it specifically for NoResults -->
            </p>
                
            
            
            <p class="text-base text-center"> {{ provideTip() }} </p>
        </div>
    </section>
</template>

<style scoped>

</style>