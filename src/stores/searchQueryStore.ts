import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchQueryStore = defineStore(`searchQueryStore`, () => {
    const queryText = ref('');

    return { queryText }
});