<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const props = defineProps<{
    color: string,
    currentFolderColor: string | null
}>();

const colorPreviewBoxEmits = defineEmits(['colorPick']);

const checkCurrentFolderColor = computed(() => {
    return props.color === props.currentFolderColor;
})

const getColor = computed(() => `bg-[${props.color}]`)

</script>

<template>
    <div @click="colorPreviewBoxEmits('colorPick', props.color)" class="w-10 h-10 border-2 border-solid border-[#222c] rounded-full shadow-[0.1rem_0.1rem_0.33rem_#222] flex items-center justify-center" :class="getColor, checkCurrentFolderColor && `border-4`">
        <input type="radio" name="color" aria-label="Pick this color" class="h-0 w-0" required="true" :checked="checkCurrentFolderColor">
        <FontAwesomeIcon v-if="checkCurrentFolderColor" :icon="faCheck" class="text-xl text-black font-bold" />
    </div>
</template>

<style scoped>

</style>