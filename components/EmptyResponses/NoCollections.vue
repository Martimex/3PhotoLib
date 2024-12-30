<script setup lang="ts">
import { faFolder } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

</script>

<template>
    <section class="grid grid-rows-1 grid-cols-[1fr_auto_1fr] items-center">
        <div class="bg-black h-[0.15rem] mr-3 shadow-xl shadow-black w-full justify-self-end
            sm:max-w-[250px]
            md:max-w-[290px] md:mr-6
            lg:max-w-[330px] lg:mr-9
        "></div>
        <div class="w-fit mt-6 mb-8 mx-auto border-black rounded-md border-2"></div>
        <div class="bg-black h-[0.15rem] ml-3 shadow-xl shadow-black w-full
            sm:max-w-[250px]
            md:max-w-[290px] md:ml-6
            lg:max-w-[330px] lg:ml-9
        "></div>
    </section>
    <section class="transition-opacity duration-500 delay-200 flex flex-col items-center justify-center pb-20">
        <FontAwesomeIcon :icon="faFolder" class="text-9xl text-gray-200 my-10
            sm:my-5
            lg:text-[10rem]
        "/>
        <div class="mx-6 text-gray-300 font-semibold flex flex-col items-center gap-y-4 text-center
            sm:max-w-[250px]
        ">
            <p class="text-base"> Currently you have no active collections. To add one, please click the <b> + </b> icon to continue. </p>
        </div>
    </section>
</template>

<style scoped>

</style>