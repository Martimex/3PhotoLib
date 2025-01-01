<script setup lang="ts">
import { utilizePhotoProvider } from '../../types/type_utilities';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PhotoProvider from '@/providers/photoProvidersInitializer';
import { getCollectionsLimit, getPhotosInCollectionLimit } from '~/utils/getAccountLimitations';
import setCollectionState from '~/composables/setCollectionState';
import type { availablePhotoTypes, availableProviderNames, collectionStates, collectionStateCheckObject } from '~/types/type_utilities';
import type PhotoResponseModel from '~/types/responseModel_photo';
import type CollectionResponseModel from '~/types/responseModel_collection';
import requestImagePhoto from '~/composables/requestImagePhoto';


const props = defineProps<{
    isMoveToMode: boolean,
    imgData: availablePhotoTypes,
    provider: availableProviderNames,
}>();

const { currentUser_get, collections_edit } = useAuthStore();
const { isAddToNewCollectionTextActive_set, asyncProcess_get, asyncProcess_set } = useStatusStore();
const { viewedCollection_get } = useCollectionStore();
const sStore = useStatusStore();

const { isCollectionAddedViaTheModal } = storeToRefs(useStatusStore());

const currentCollection = ref<CollectionResponseModel | null>(viewedCollection_get());
const providerObj = new PhotoProvider(props.provider).setCurrentProvider();
const isCloneOptionActive = ref<boolean>(false);

const modalEmits = defineEmits(['modalClose', 'addCollectionModalOpen', 'confirmAddedToCollection', 'confirmMoveToAnotherCollection']);

const { collectionsToAddPhoto } = useTemporalStore();

const allCollections = ref<CollectionResponseModel[]>(currentUser_get()?.collections);
const collectionStatesObj = reactive<collectionStates>({
    base: [], moveFrom: [], addOrMoveTo: [], maxPhotos: [], hasThatPhoto: []
})

const shouldAddToNewCollectionTextBeDisplayed = computed(() => {
    if(allCollections.value.length >= getCollectionsLimit()) return false;
    return sStore.isAddToNewCollectionTextActive;
});

const applyHeadingText = computed(() => {
    return (isCloneOptionActive.value)? `Cloning from` : `Moving from`;
})

const stateCheckDependencies = {
    collection_viewed: viewedCollection_get(),
    image_targetID: `${props.provider}=${props.imgData.id}`,
    limit_photosInCollection: getPhotosInCollectionLimit()
}

function handleSimulateAddToCollection(collectionData: CollectionResponseModel, isCollectionChosen: boolean) {
    isCollectionChosen? collectionsToAddPhoto.addNew(collectionData) : collectionsToAddPhoto.removeExisting(collectionData);
}

async function handleSaveOrMoveToCollection() {
    asyncProcess_set(true);

    if(collectionsToAddPhoto.chosenCollections.length) {
        let thePhoto; 

        if(collectionStatesObj.moveFrom.length && !isCloneOptionActive.value) {
            if(collectionStatesObj.moveFrom.length > 1) { throw new Error('Move from status should contain just 1 folder and no more!')}
            // Will only happen for MoveTo operation (not cloning!)
            thePhoto = await $fetch(`/photo/moveTo`, { method: 'post', body: {
                collectionsToAddImage: collectionsToAddPhoto.chosenCollections,
                collectionToRemoveImage: collectionStatesObj.moveFrom[0],
                photoID: `${props.provider}=${props.imgData.id}`,
                photoData: props.imgData,
                provider: props.provider
            }}) as PhotoResponseModel;

            // Finally update UI to remove the moved photo from initial collection
            // First create a copy and collections_edit with ( colectiona data - the photo which was moved)

            const collectionToRemovePhoto_copy = {...collectionStatesObj.moveFrom[0]};
            const updatedCollectionPhotos = collectionToRemovePhoto_copy.collectionPhotos.toSpliced(collectionToRemovePhoto_copy.collectionPhotos.map(photo => photo.photoId).indexOf(`${props.provider}=${props.imgData.id}`), 1);
            collectionToRemovePhoto_copy.collectionPhotos = updatedCollectionPhotos;
            collections_edit(collectionToRemovePhoto_copy);

            modalEmits('confirmMoveToAnotherCollection', collectionToRemovePhoto_copy);

        } else {
            // This code will be targeted for every SaveTo and CloneTo operations
            thePhoto = await $fetch(`/photo/saveTo`, { method: 'post', body: {
                collections: collectionsToAddPhoto.chosenCollections,
                photoID: `${props.provider}=${props.imgData.id}`,
                photoData: props.imgData,
                provider: props.provider
            }}) as PhotoResponseModel;
        }

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

function handleChangeCloneOrMoveOption() {
    isCloneOptionActive.value = !isCloneOptionActive.value;
}

onBeforeMount(() => {
	if(!allCollections.value) throw new Error('FAILED TO FETCH USER COLLECTIONS');
    isCollectionAddedViaTheModal.value = false;
	Object.assign(collectionStatesObj, setCollectionState(allCollections.value, props.isMoveToMode, stateCheckDependencies));
})

watch(isCollectionAddedViaTheModal, () => {
    const currentUserCollections = currentUser_get()?.collections;
    Object.assign(collectionStatesObj, setCollectionState(currentUserCollections, props.isMoveToMode, stateCheckDependencies));
})

/* watch(shouldAddToNewCollectionTextBeDisplayed, () => {
    // Here make a new collection with number 1 of photos and make plus sign green (SOMEHOW ?)
}) */

/* onBeforeMount(() => {
    // If we open the modal and user already has maximum collections, do not show the blue text initially
    (allCollections.value.length >= getCollectionsLimit())? isAddToNewCollectionTextActive_set(false) : isAddToNewCollectionTextActive_set(true);
}); */
onUnmounted(() => {
    isCollectionAddedViaTheModal.value = false;
    isAddToNewCollectionTextActive_set(true);
    collectionsToAddPhoto.reset();
});

</script>

<template>
    <div class="h-screen w-full bg-[#222b] fixed top-0 left-0 z-10 backdrop-blur flex items-center justify-center overflow-auto" @click.self="!asyncProcess_get() && modalEmits('modalClose')">
        <section class="bg-[#eee] m-auto w-full h-fit px-3 py-6 rounded-md shadow-[0.3rem_0.3rem_0.5rem_#222] border-2 border-[#222] border-solid
            sm:max-w-[min(90%,_990px)]
        ">
            <h2 class="max-w-[80%] align-middle mx-auto text-5xl font-bold text-center py-6 mb-9 border-[#222] border-solid border-b-4"> {{ props.isMoveToMode? `Move To` : `Save To` }} </h2>
            <section class="pb-4
                sm:grid sm:grid-cols-2 sm:gap-x-8 sm:px-6
            ">
                <div class="flex justify-center
                    sm:h-full
                    lg:max-w-[90%]
                ">
                    <img ref="imgRef" :src="providerObj?.getHighResImageURL(utilizePhotoProvider(props.imgData))" @error="requestImagePhoto($event, props.provider, `${props.imgData.id}`)" class="min-h-[40vh] max-h-[75vh] mb-12 object-cover object-center transition-opacity rounded-md shadow-lg shadow-[#222]
                        sm:sticky sm:top-10 sm:h-fit
                    " />    
                </div>
                <div>
                    <div v-if="props.isMoveToMode && collectionStatesObj.moveFrom.length" class="mb-6 py-3 border-b-2 border-dashed border-[#222]">
                        <h3 class="text-3xl font-semibold mx-6 mb-4"> {{ applyHeadingText }} </h3>
                        <ModalCollectionListItem v-for="coll in collectionStatesObj.moveFrom" :key="`mf-${coll.releaseId}`" :collectionData="coll" :viewedImageID="`${props.provider}=${props.imgData.id}`" status="moveFrom" 
                            @changeCloneOrMoveOption="handleChangeCloneOrMoveOption"
                        />
                    </div>
                    <div class="flex flex-col mb-6">
                        <h3 v-if="props.isMoveToMode" class="text-3xl font-semibold mx-6 my-4"> To collections </h3>
                        <div v-if="collectionStatesObj.addOrMoveTo.length">
                            <ModalCollectionListItem v-for="coll in collectionStatesObj.addOrMoveTo" :key="`aomt-${coll.releaseId}`" :collectionData="coll" :viewedImageID="`${props.provider}=${props.imgData.id}`" status="addOrMoveTo"
                                @simulateAddToCollection="handleSimulateAddToCollection"
                            />
                        </div>
                        <!-- IF USER DOES NOT REACH MAXIMUM COLLECTIONS YET, SHOW THE ONCE-TO-USE BUTTON -->
                        <div v-if="shouldAddToNewCollectionTextBeDisplayed" @click="!asyncProcess_get() && $emit('addCollectionModalOpen')" class="flex items-center mt-4 mx-3 py-1 mb-3 border-blue-300 border-b-2 border-bottom-solid w-fit">
                            <FontAwesomeIcon :icon="faPlus" class="text-3xl mr-4 text-blue-400 drop-icon my-auto px-1 drop-shadow-[0rem_0rem_0.40rem_#fff]"></FontAwesomeIcon>
                            <p class="text-blue-400 text-extrabold text-xl  custom-text-shadow drop-shadow-[0rem_0rem_0.40rem_#fff]"> {{ props.isMoveToMode? `Move to new collection` : `Add to new collection` }} </p>
                        </div>
                    </div>
                    <div v-if="collectionStatesObj.hasThatPhoto.length" class="flex flex-col mb-6">
                        <h3 class="text-2xl font-semibold mx-6 my-3
                            sm:ml-3
                        "> This photo is inside: </h3>
                        <ModalCollectionListItem v-for="coll in collectionStatesObj.hasThatPhoto" :key="`htp-${coll.releaseId}`" :collectionData="coll" :viewedImageID="`${props.provider}=${props.imgData.id}`" status="hasThatPhoto" />
                    </div>
                    <div v-if="collectionStatesObj.maxPhotos.length" class="flex flex-col mb-6">
                        <h3 class="text-2xl font-semibold mx-6 my-3
                            sm:ml-3
                        "> Filled collections: </h3>
                        <ModalCollectionListItem v-for="coll in collectionStatesObj.maxPhotos" :key="`mp-${coll.releaseId}`" :collectionData="coll" :viewedImageID="`${props.provider}=${props.imgData.id}`" status="maxPhotos"  />
                    </div>
                </div>
            </section>
            <div class="grid grid-cols-2 grid-rows-1 pt-4 gap-x-4
                sm:mx-auto sm:max-w-[660px]
            ">
                <button type="reset" @click.self="!asyncProcess_get() && modalEmits('modalClose')" class="font-normal text-lg border-2 border-black rounded-md py-4"> Cancel </button>
                <button type="submit" @click.self="!asyncProcess_get() && handleSaveOrMoveToCollection()" class="font-bold text-lg border-2 border-black bg-[#222d] text-neutral-100 rounded-md py-4"> Confirm </button>
            </div>
        </section>
    </div>
</template>

<style scoped>

.custom-text-shadow {
    text-shadow: 0rem 0rem 1rem rgb(96, 165, 250);
}

</style>