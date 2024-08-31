<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCancel } from "@fortawesome/free-solid-svg-icons";
</script>

<template>
    <div class="absolute inset-0 grid grid-rows-[1fr_auto] text-white bg-black/[.25]">
        <div class="p-[1.5rem] backdrop-blur-lg overflow-auto flex items-center justify-center">
            <FontAwesomeIcon :icon="faCancel" class="text-red-500 text-[45vw] drop-shadow-[0.25rem_0.25rem_0.25rem_#222222]" />
        </div>
    </div>
</template>

<style scoped>

</style>