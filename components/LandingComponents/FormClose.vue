<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faTimes } from '@fortawesome/free-solid-svg-icons';

    const tStore = useTemporalStore();
    const sStore = useStatusStore();

    function handleComponentClose() {
        tStore.clearInputsText(tStore.inputsText);
        sStore.currentHomePageView = sStore.homePageViewsHierarchy[sStore.homePageViewsHierarchy.length - 1];
        sStore.removeHomePageViewHierarchy();
    }

</script>

<template>
    <div class="p-3 absolute top-0 right-0 rounded-es-full border-[#dddd] border-t-transparent border-r-transparent border-double border-4"
        @click="handleComponentClose"
    >
        <div class="relative">
            <FontAwesomeIcon :icon="faTimes" class="relative -top-2 -right-2 font-bold text-3xl text-[#eee] pointer-events-none"></FontAwesomeIcon>
        </div>
    </div>
</template>

<style scoped>

</style>