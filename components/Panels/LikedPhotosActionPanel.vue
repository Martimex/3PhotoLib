<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faTools } from '@fortawesome/free-solid-svg-icons';

const { likedPhotos_setEditMode } = useStatusStore();

function handleSetEditMode() {
    likedPhotos_setEditMode(true);
}

</script>

<template>
    <nav class="sticky bottom-0 left-0 right-0 text-black py-7 bg-gray-200 flex justify-around items-center">
        <FontAwesomeIcon :icon="faArrowLeft" class="text-4xl"></FontAwesomeIcon>
        <FontAwesomeIcon :icon="faTools" class="text-4xl" @click="handleSetEditMode" ></FontAwesomeIcon>
    </nav>
</template>

<style scoped>

</style>