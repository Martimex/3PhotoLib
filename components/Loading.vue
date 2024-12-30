<script setup lang="ts">
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const rootElement = ref<HTMLDivElement | null>(null);

//onMounted(() => rootElement?.value?.classList.remove('opacity-0'))

</script>

<template>
    <div ref="rootElement" class="transition-opacity duration-500 delay-200 flex flex-col items-center justify-center h-screen fixed top-[45%] left-[50%] mr-[-50%] -translate-x-2/4 -translate-y-2/4
        sm:top-[50%]
    ">
        <FontAwesomeIcon :icon="faSpinner" spin class="text-9xl text-gray-200 my-10
            sm:mb-6
            lg:mb-10 lg:text-[10rem]
        " />
        <p class="text-3xl text-gray-300 text-center font-semibold py-2"> Loading... </p>
    </div>
</template>

<style scoped>

</style>