<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faForward, faBackward, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

    // searchPageCount SHOULD NOT be reactive, therefore it is imported as below
    const { searchPageCount, outputPhotosNumber, searchPageObj } = useSearchQueryStore();
    const emits = defineEmits(['switchPage']);

    const props = defineProps<{
        isNextPageAvailable: boolean
    }>();

    const isLeftSwitchPossibleToPress = computed(() => {
        if(searchPageCount === searchPageObj.min) return false;
        return true;
    })

    const isRightSwitchPossibleToPress = computed(() => {
        if(searchPageCount === searchPageObj.max) return false;
        if(!props.isNextPageAvailable) return false;
        return true;
    })

</script>

<template>
    <section class="flex items-center justify-around mt-8">
        <FontAwesomeIcon :icon="faArrowLeft" class="text-3xl text-[#333] drop-shadow-[0_0_0.25rem_#222]" :class="!isLeftSwitchPossibleToPress && `opacity-35`"
            @click="isLeftSwitchPossibleToPress && emits('switchPage', searchPageCount + -1)"
        />
        <p class="text-3xl font-semibold text-center my-4"> {{  searchPageCount  }}</p>
        <FontAwesomeIcon :icon="faArrowRight" class="text-3xl text-[#333] drop-shadow-[0_0_0.25rem_#222]" :class="!isRightSwitchPossibleToPress && `opacity-35`"
            @click="isRightSwitchPossibleToPress && emits('switchPage', searchPageCount + 1)"
        />
    </section>
</template>

<style scoped>

</style>