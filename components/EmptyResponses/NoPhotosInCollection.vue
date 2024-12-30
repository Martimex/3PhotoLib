<script setup lang="ts">
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

</script>

<template>
    <section class="transition-opacity duration-500 delay-200 flex flex-col items-center justify-center">
        <FontAwesomeIcon :icon="faImage" class="text-9xl text-gray-200 my-10
            sm:my-5
            lg:text-[10rem]
        "/>
        <div class="mx-6 text-gray-300 font-semibold flex flex-col items-center gap-y-4 text-center
            sm:max-w-[250px]
        ">
            <p class="text-base"> This collection is currently empty. It is time to fill it up with some images! </p>
        </div>
    </section>
</template>

<style scoped>

</style>