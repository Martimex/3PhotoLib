<script setup lang="ts">
import { faXmark, faFaceFrownOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useSearchQueryStore } from '@/stores/searchQueryStore';
import { storeToRefs } from 'pinia';

const sqStore = useSearchQueryStore();
const { queryText, searchPageCount, outputPhotosNumber } = storeToRefs(sqStore);

const maxQueryDisplayLength = ref<number>(16);
const rootElement = ref<HTMLDivElement | null>(null);

function provideTip(): string {
    if(searchPageCount.value > 1) return `Try to decrease page number to 1`;
    if(outputPhotosNumber.value > 1) return `Try to lower photos output amount to 1`;
    return `Try to change the search phrase to a different value`;
}

//onMounted(() => rootElement?.value?.classList.remove('opacity-0'))

</script>

<template>
    <section ref="rootElement" class="transition-opacity duration-500 delay-200 flex flex-col items-center justify-center h-screen fixed top-[45%] left-[50%] mr-[-50%] -translate-x-2/4 -translate-y-2/4">
        <FontAwesomeIcon :icon="faFaceFrownOpen" class="text-9xl text-gray-300 my-10"/>
        <div class="mx-6">
            <p class="text-lg text-gray-400 text-center"> No results found for the query: </p> 
            <p class="text-xl text-gray-400 text-center font-semibold py-2" > {{ queryText.slice(0, maxQueryDisplayLength) + (Boolean(queryText.length > maxQueryDisplayLength)? '...' : '')}} </p> <!-- If query text length is longer than 20 chars, we will trim it specifically for NoResults -->
            <!-- <p class="text-xl text-gray-400 text-center font-semibold py-2"> on page: {{ searchPageCount }}</p> -->
            <p class="text-lg text-gray-400 text-center"> {{ provideTip() }} </p>
        </div>
    </section>
</template>

<style scoped>

</style>