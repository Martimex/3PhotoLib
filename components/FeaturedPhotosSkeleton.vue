<script setup lang="ts">
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';
    defineProps({
        skeletonsCount: { type: Number }
    })
</script>

<template>
    <div v-for="index in skeletonsCount">
        <AnimatedPlaceholder height="44vh" />
    </div>   
</template>

<style scoped>

</style>