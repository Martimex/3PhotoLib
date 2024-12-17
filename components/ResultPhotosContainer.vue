<script setup lang="ts">
import type { availablePhotoTypes, availableProviderNames } from '../types/type_utilities';
import PhotoItem from './PhotoItem.vue';
import { responsiveLayoutData } from '~/utils/getResponsiveLayoutData';
import type PhotoResponseModel from '~/types/responseModel_photo';

const props = defineProps<{
    photosArray: availablePhotoTypes[] | PhotoResponseModel[],
    providerName: availableProviderNames
}>();

const { currentBreakpoint } = storeToRefs(useStatusStore());

function isPhotoResponseModel(photo: PhotoResponseModel | availablePhotoTypes): photo is PhotoResponseModel {
    // This is a Type guard
    return (photo as PhotoResponseModel).photoDetails !== undefined;
}

function checkPhotoDetails(photo: PhotoResponseModel | availablePhotoTypes): availablePhotoTypes {
    return isPhotoResponseModel(photo)? photo.photoDetails : photo;
}

function checkPhotoProvider(photo: availablePhotoTypes | PhotoResponseModel): availableProviderNames {
    return isPhotoResponseModel(photo)? photo.provider : props.providerName;
}

</script>

<template>
    <section class="gap-x-4 items-start mx-auto
        sm:grid-cols-2 sm:grid
        lg:grid-cols-3 
    ">
        <div v-for="index in Array.from(new Array(responsiveLayoutData[currentBreakpoint].grid.columns)).map((el, ind) => ind)" :key="`grid-col-${index}`" class="grid">
            <PhotoItem v-for="image in props.photosArray.filter((el, ind) => ind % responsiveLayoutData[currentBreakpoint].grid.columns === index)" :key="image.id" :imgData="checkPhotoDetails(image)" :provider="checkPhotoProvider(image)" />
        </div>
    </section>
</template>

<style scoped>

</style>