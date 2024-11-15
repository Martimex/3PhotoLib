<script setup lang="ts">
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

</script>

<template>
    <section class="transition-opacity duration-500 delay-200 flex flex-col items-center justify-center">
        <FontAwesomeIcon :icon="faImage" class="text-9xl text-gray-300 my-10"/>
        <div class="mx-6 text-gray-400 flex flex-col items-center gap-y-4 text-center">
            <p class="text-base"> This collection is currently empty. It is time to fill it up with some images! </p>
        </div>
    </section>
</template>

<style scoped>

</style>