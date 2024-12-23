<script setup lang="ts">
import type { availablePhotoTypes, availableProviderNames } from '../types/type_utilities';
import PhotoItem from './PhotoItem.vue';
import { responsiveLayoutData } from '~/utils/getResponsiveLayoutData';
import type CollectionResponseModel from '~/types/responseModel_collection';

const props = defineProps<{
    collectionsArray: CollectionResponseModel[],
}>();

const emits = defineEmits(['setCollectionAsViewed', 'tryToDeleteCollection']);

function passSetCollectionAsViewed(collection: CollectionResponseModel) { emits('setCollectionAsViewed', collection); }
function passTryToDeleteCollection(collection: CollectionResponseModel) { emits('tryToDeleteCollection', collection); }

const { currentBreakpoint } = storeToRefs(useStatusStore());

onMounted(() => console.warn(props.collectionsArray));

</script>

<template>
    <section class="gap-x-4 items-start mx-auto
        sm:grid-cols-2 sm:grid
        lg:grid-cols-3 
    ">
        <div v-for="index in Array.from(new Array(responsiveLayoutData[currentBreakpoint].grid.columns)).map((el, ind) => ind)" :key="`grid-col-${index}`" class="flex flex-col items-center justify-center">
            <CollectionPreviewListItem v-for="collection in props.collectionsArray.filter((el, ind) => ind % responsiveLayoutData[currentBreakpoint].grid.columns === index)" :key="collection.id"  :collectionData="collection" 
                @set-collection-as-viewed="passSetCollectionAsViewed(collection)"
                @try-to-delete-collection="passTryToDeleteCollection(collection)"
            />
        </div>
    </section>
</template>

<style scoped>

</style>