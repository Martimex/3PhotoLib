<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFolder, faPlus, faLock } from '@fortawesome/free-solid-svg-icons';
import type CollectionResponseModel from '~/types/responseModel_collection';
import type { collectionStatesKeys } from '~/types/type_utilities';

const props = defineProps<{
    collectionData: CollectionResponseModel,
    viewedImageID: string,
    status: collectionStatesKeys
}>();

const { isAddToNewCollectionTextActive, asyncProcess_get } = useStatusStore();
const useEmit = defineEmits(['simulateAddToCollection', 'changeCloneOrMoveOption']);

const canPhotoBeAdded = ref<boolean>(props.status === 'addOrMoveTo');
const isMoveFromFolder = ref<boolean>(props.status === 'moveFrom');
const isChosenPhotoInCollection = ref<boolean>(props.status === 'hasThatPhoto');
const isCollectionFull = ref<boolean>(props.status === 'maxPhotos');

const isCollectionChosen = ref<boolean>(false);
const isCloneOptionChosen = ref<boolean>(false);

const testCollectionChosen = computed(() => isCollectionChosen.value? `text-[#81e481]` : `text-[#ddd]`);
const testCloneOptionChosen = computed(() => isCloneOptionChosen.value? `text-[#ffdf33]` : `text-[#ddd]`)

const simulateCollectionPhotosCount = computed(() => {
    if(isChosenPhotoInCollection.value) { return 'x'};
    return props.collectionData.collectionPhotos.length + (isCollectionChosen.value? 1 : 0) 
});

const applyFolderVisuals = computed(() => {
    if(isChosenPhotoInCollection.value) { return `border-none font-bold text-6xl mt-1 p-4`}
    else if(isCollectionFull.value) { return `border-double p-3 font-bold mt-2`}
    else { return `border-dotted mt-2 p-4`}
})

const tryToApplyInactiveStyling = computed(() => {
    if(isChosenPhotoInCollection.value || isCollectionFull.value) return `bg-[#ddd0] grayscale-[40%]`;
})

const handleIconSizing = computed(() => {
    if(isChosenPhotoInCollection.value || isCollectionFull.value) return `text-5xl`;
    return `text-7xl`
})

const handleCollectionTextSizing = computed(() => {
    if(isChosenPhotoInCollection.value || isCollectionFull.value) return `text-lg font-normal`;
    return `text-xl font-semibold`
})

function handlePlusIconClick(collectionData: any) {
    // Order important!
    isCollectionChosen.value = !isCollectionChosen.value;
    useEmit('simulateAddToCollection', collectionData, isCollectionChosen.value);
}

function handleLockIconClick() {
    // Order important!
    isCloneOptionChosen.value = !isCloneOptionChosen.value;
    useEmit('changeCloneOrMoveOption');
}

onBeforeMount(() => {
    console.log('STATUS? ', props.status);
    console.log(props.viewedImageID, '  => COLLECTIONDATA:: ', props.collectionData);
    if(!isAddToNewCollectionTextActive) { isCollectionChosen.value = true; }
})

</script>

<template>
    <div class="py-5 grid grid-cols-[auto_1fr_auto_auto] grid-rows-1 items-center" :class="tryToApplyInactiveStyling">
        <div class="relative">
            <FontAwesomeIcon :icon="faFolder" class="drop-icon mx-3 my-auto px-1 drop-shadow-[0rem_0rem_0.20rem_#222d]" :class="[`text-[${collectionData.folderColor}]`, handleIconSizing]"></FontAwesomeIcon>
            <div class="flex h-full w-full items-center justify-center absolute top-0 left-0">
                <span class="text-lg text-[#222] font-semibold rounded-full border-[#222b] border-2 w-4 h-4 flex flex-wrap content-center justify-center" :class="applyFolderVisuals"> {{ simulateCollectionPhotosCount }} </span>
            </div>
        </div>
        <h3 class="text-over truncate break-words ml-2 mr-4" :class="handleCollectionTextSizing"> {{ collectionData.name }}</h3>
        <FontAwesomeIcon v-if="canPhotoBeAdded" :icon="faPlus" @click="!asyncProcess_get() && handlePlusIconClick(collectionData)" :class="testCollectionChosen" class="text-5xl drop-icon mx-3 my-auto px-1 drop-shadow-[0rem_0rem_0.20rem_#222d]"></FontAwesomeIcon>
        <FontAwesomeIcon v-else-if="isMoveFromFolder" :icon=faLock @click="!asyncProcess_get() && handleLockIconClick()" :class="testCloneOptionChosen" class="text-4xl drop-icon mx-3 my-auto px-1 drop-shadow-[0rem_0rem_0.20rem_#222d]" />
    </div>
</template>

<style scoped>

</style>