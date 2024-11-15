<script setup lang="ts">
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

</script>

<template>
    <section class="transition-opacity duration-500 delay-200 flex flex-col items-center justify-center pb-20">
        <FontAwesomeIcon :icon="faHeart" class="text-9xl text-gray-300 my-10"/>
        <div class="mx-6 text-gray-400 flex flex-col items-center gap-y-4 text-center">
            <p class="text-base"> Seems that you have not added any liked photos... yet! </p>
        </div>
    </section>
</template>

<style scoped>

</style>