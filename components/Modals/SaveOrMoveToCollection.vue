<script setup lang="ts">
import { utilizePhotoProvider } from '../../types/type_utilities';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PhotoProvider from '@/providers/photoProvidersInitializer';
import { getCollectionsLimit } from '~/utils/getAccountLimitations';
import type { availablePhotoTypes, availableProviderNames } from '~/types/type_utilities';
import type PhotoResponseModel from '~/types/responseModel_photo';
import type CollectionResponseModel from '~/types/responseModel_collection';

const props = defineProps<{
    isMoveToMode: boolean,
    imgData: availablePhotoTypes,
    provider: availableProviderNames,
}>();

const { currentUser_get, collections_edit } = useAuthStore();
const { isAddToNewCollectionTextActive_set, asyncProcess_get, asyncProcess_set } = useStatusStore();
const sStore = useStatusStore();

const providerObj = new PhotoProvider(props.provider).setCurrentProvider();

const modalEmits = defineEmits(['modalClose', 'addCollectionModalOpen', 'confirmAddedToCollection']);

const { collectionsToAddPhoto } = useTemporalStore();

// THIS IS NOT UPDATES WHEN currentUser_get()?.collections CHANGE !!! FIX THAT
const allCollections = ref<CollectionResponseModel[]>(currentUser_get()?.collections);

const shouldAddToNewCollectionTextBeDisplayed = computed(() => {
    if(allCollections.value.length >= getCollectionsLimit()) return false;
    return sStore.isAddToNewCollectionTextActive;
});

function handleSimulateAddToCollection(collectionData: CollectionResponseModel, isCollectionChosen: boolean) {
    isCollectionChosen? collectionsToAddPhoto.addNew(collectionData) : collectionsToAddPhoto.removeExisting(collectionData);
}

async function handleSaveToCollection() {
    asyncProcess_set(true);

    if(collectionsToAddPhoto.chosenCollections.length) {
        const thePhoto = await $fetch(`/photo/saveTo`, { method: 'post', body: {
            collections: collectionsToAddPhoto.chosenCollections,
            photoID: `${props.provider}=${props.imgData.id}`,
            photoData: props.imgData,
            provider: props.provider
        }}) as PhotoResponseModel;

        // Afterwards lets update UI so that collections photos count is correct
        [...collectionsToAddPhoto.chosenCollections].forEach(collection => {
            collection.collectionPhotos.push(thePhoto);
            collections_edit(collection);
        });
        allCollections.value = currentUser_get()?.collections;

        modalEmits('confirmAddedToCollection');
    }

    modalEmits('modalClose');
    asyncProcess_set(false);
}

onMounted(() => console.error(currentUser_get()?.collections))

/* watch(shouldAddToNewCollectionTextBeDisplayed, () => {
    console.log('SOMETHING TEST 123');
    // Here make a new collection with number 1 of photos and make plus sign green (SOMEHOW ?)
}) */

/* onBeforeMount(() => {
    // If we open the modal and user already has maximum collections, do not show the blue text initially
    (allCollections.value.length >= getCollectionsLimit())? isAddToNewCollectionTextActive_set(false) : isAddToNewCollectionTextActive_set(true);
}); */
onUnmounted(() => {
    isAddToNewCollectionTextActive_set(true);
    collectionsToAddPhoto.reset();
});

</script>

<template>
    <div class="h-screen w-full bg-[#222b] fixed top-0 left-0 z-10 backdrop-blur flex items-center justify-center overflow-auto" @click.self="!asyncProcess_get() && modalEmits('modalClose')">
        <section class="bg-[#eee] m-auto w-full h-fit px-3 py-6 rounded-md shadow-[0.3rem_0.3rem_0.5rem_#222] border-2 border-[#222] border-solid">
            <h2 class="max-w-[80%] align-middle mx-auto text-4xl font-bold text-center py-6 mb-9 border-[#222] border-solid border-b-4"> {{ props.isMoveToMode? `Move to collection` : `Save to collection` }} </h2>
            <div>
                <img ref="imgRef" :src="providerObj?.getHighResImageURL(utilizePhotoProvider(props.imgData))" loading="lazy" class="min-h-[40vh] mb-6 object-cover object-center transition-opacity rounded-md shadow-lg shadow-[#222]" />    
            </div>
            <div class="flex flex-col mb-6">
                <ModalCollectionListItem v-for="collection in allCollections" :key="`id-${collection.releaseId}`" :collectionData="collection" :viewedImageID="`${props.provider}=${props.imgData.id}`"
                    @simulateAddToCollection="handleSimulateAddToCollection"
                />
                <!-- IF USER DOES NOT REACH MAXIMUM COLLECTIONS YET, SHOW THE ONCE-TO-USE BUTTON -->
                <div v-if="shouldAddToNewCollectionTextBeDisplayed" @click="!asyncProcess_get() && $emit('addCollectionModalOpen')" class="flex items-center mt-4 mx-3 pb-1 border-blue-300 border-b-2 border-bottom-solid w-fit">
                    <FontAwesomeIcon :icon="faPlus" class="text-3xl mr-4 text-blue-400 drop-icon my-auto px-1 drop-shadow-[0rem_0rem_0.40rem_#fff]"></FontAwesomeIcon>
                    <p class="text-blue-400 text-extrabold text-xl  custom-text-shadow drop-shadow-[0rem_0rem_0.40rem_#fff]"> Add to new collection </p>
                </div>
            </div>

            <div class="grid grid-cols-2 grid-rows-1 pt-9">
                <button type="reset" @click.self="!asyncProcess_get() && modalEmits('modalClose')" class="font-normal text-lg border-2 border-black rounded-md py-4"> Cancel </button>
                <button type="submit" @click.self="!asyncProcess_get() && handleSaveToCollection()" class="font-bold text-lg border-2 border-black bg-[#222d] text-neutral-100 rounded-md py-4"> Confirm </button>
            </div>
        </section>
    </div>
</template>

<style scoped>

.custom-text-shadow {
    text-shadow: 0rem 0rem 1rem rgb(96, 165, 250);
}

</style>