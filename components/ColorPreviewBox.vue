<script setup lang="ts">

defineProps<{
    color: string
}>();

</script>

<template>
    <div class="w-10 h-10 border-2 border-solid border-[#222c] rounded-full shadow-[0.1rem_0.1rem_0.33rem_#222]" :class="$props.color">
    
    </div>
</template>

<style scoped>

</style>