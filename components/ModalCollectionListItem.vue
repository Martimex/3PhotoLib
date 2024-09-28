<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFolder, faPlus, faAsterisk, faXmark } from '@fortawesome/free-solid-svg-icons';
import { getPhotosInCollectionLimit } from '~/utils/getAccountLimitations';
import { checkIfPhotoIsInCollection } from '~/utils/checkIfPhotoIsInCollection';
import type CollectionResponseModel from '~/types/responseModel_collection';

const props = defineProps<{
    collectionData: CollectionResponseModel,
    viewedImageID: string
}>();

const { isAddToNewCollectionTextActive, asyncProcess_get } = useStatusStore();
const useEmit = defineEmits(['simulateAddToCollection']);

const isCollectionChosen = ref<boolean>(false);
const isCollectionFull = ref<boolean>(false);
const isChosenPhotoInCollection = ref<boolean>(checkIfPhotoIsInCollection(props.collectionData, props.viewedImageID));

const testCollectionChosen = computed(() => isCollectionChosen.value? `text-[#81e481]` : `text-[#ddd]`);
const simulateCollectionPhotosCount = computed(() => props.collectionData.collectionPhotos.length + (isCollectionChosen.value? 1 : 0) );

function handlePlusIconClick(collectionData: any) {
    // Order important!
    isCollectionChosen.value = !isCollectionChosen.value;
    useEmit('simulateAddToCollection', collectionData, isCollectionChosen.value);
}

const testIfPhotoCanBeAdded = computed(() => !(isCollectionFull.value || isChosenPhotoInCollection.value)) 

onBeforeMount(() => {
    console.log(props.viewedImageID, '  => COLLECTIONDATA:: ', props.collectionData);
    if(props.collectionData.collectionPhotos.length >= getPhotosInCollectionLimit()) { isCollectionFull.value = true; }
    if(!isAddToNewCollectionTextActive) { isCollectionChosen.value = true; }
})

</script>

<template>
    <div class="py-6 grid grid-cols-[auto_1fr_auto_auto] grid-rows-1 items-center" :class="!testIfPhotoCanBeAdded && `bg-[#ddd8] grayscale-[50%]`">
        <div class="relative">
            <FontAwesomeIcon :icon="faFolder" class="text-6xl drop-icon mx-3 my-auto px-1 drop-shadow-[0rem_0rem_0.20rem_#222d]" :class="`text-[${collectionData.folderColor}]`"></FontAwesomeIcon>
            <div class="flex h-full w-full items-center justify-center absolute top-0 left-0">
                <span class="text-lg text-[#222] font-semibold rounded-full border-[#222b] border-2 border-dotted w-4 h-4 p-4 mt-2 flex flex-wrap content-center justify-center" :class="!testIfPhotoCanBeAdded && `border-double font-bold`"> {{isChosenPhotoInCollection? `X` : simulateCollectionPhotosCount }} </span>
            </div>
        </div>
        <h3 class="text-xl font-semibold text-over truncate break-words ml-2 mr-4"> {{ collectionData.name }}</h3>
        <FontAwesomeIcon v-if="!testIfPhotoCanBeAdded" :icon="faXmark" class="text-[0rem] text-[#eeea] drop-icon mx-3 my-auto px-1 drop-shadow-[0rem_0rem_0.20rem_#222d]"></FontAwesomeIcon>
        <FontAwesomeIcon v-else :icon="faPlus" @click="!asyncProcess_get() && handlePlusIconClick(collectionData)" :class="testCollectionChosen" class="text-5xl drop-icon mx-3 my-auto px-1 drop-shadow-[0rem_0rem_0.20rem_#222d]"></FontAwesomeIcon>
    </div>
</template>

<style scoped>

</style>