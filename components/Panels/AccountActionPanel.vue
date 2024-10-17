<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faSignOut, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const emits = defineEmits(['tryToLogOut']);


</script>

<template>
    <nav class="sticky bottom-0 left-0 right-0 text-black py-7 bg-gray-200 flex justify-around items-center">
        <FontAwesomeIcon :icon="faArrowLeft" class="text-4xl"></FontAwesomeIcon>
        <FontAwesomeIcon :icon="faPenToSquare" class="text-4xl"></FontAwesomeIcon>
        <FontAwesomeIcon :icon="faSignOut" @click="emits('tryToLogOut')" class="text-4xl"></FontAwesomeIcon>
    </nav>
</template>

<style scoped>

</style>