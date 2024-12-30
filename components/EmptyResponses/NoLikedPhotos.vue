<script setup lang="ts">
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

</script>

<template>
    <section class="transition-opacity duration-500 delay-200 flex flex-col items-center justify-center pb-20">
        <FontAwesomeIcon :icon="faHeart" class="text-9xl text-gray-200 my-10
            sm:my-5
            lg:text-[10rem]
        "/>
        <div class="mx-6 text-gray-300 font-semibold flex flex-col items-center gap-y-4 text-center
            sm:max-w-[250px]
        ">
            <p class="text-base"> Seems that you have not added any liked photos... yet! </p>
        </div>
    </section>
</template>

<style scoped>

</style>