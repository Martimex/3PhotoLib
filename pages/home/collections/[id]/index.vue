<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faFolder } from '@fortawesome/free-solid-svg-icons';
    import { getPhotosInCollectionLimit } from '#imports';
    import type CollectionResponseModel from '~/types/responseModel_collection';
    import type PhotoResponseModel from '~/types/responseModel_photo';
    import LikedOrSavedPhotosEditPanel from '~/components/Panels/LikedOrSavedPhotosEditPanel.vue';
    
    onMounted(() => { console.warn('C---  : ', viewedCollection_get()) });

    definePageMeta({
        middleware: 'handle-single-collection-id'
    });

    const sStore = useStatusStore();
    const { viewedCollection_get, viewedCollection_set } = useCollectionStore();
    const { collectionsOrlikedPhotos_setEditMode, photosToRemoveArray_reset } = useStatusStore();
    const { currentUser_get, collections_edit, collections_updatePhotos } = useAuthStore();
    const { isRequestPending, collectionsOrlikedPhotos_isEditModeOn } = storeToRefs(sStore);

    const isEditCollectionModalOpen = ref<boolean>(false);
    const viewedCollection = ref(viewedCollection_get());
    
    const userCollections = ref(currentUser_get()?.collections);

    const closeEditCollectionModal = () => isEditCollectionModalOpen.value = false;
    const openEditCollectionModal = () => isEditCollectionModalOpen.value = true;

    function handleEditCollection(collectionToBeEdited: CollectionResponseModel) {
        // PERFORM LOCAL EDIT AND REAPPLY USERCOLLECTIONS VALUE

        collections_edit(collectionToBeEdited);
        userCollections.value = currentUser_get()?.collections;
        viewedCollection_set(collectionToBeEdited);
        viewedCollection.value = viewedCollection_get();
    }

    function handleCurrentPhotosUpdate(deletedPhotos: PhotoResponseModel[]) {
        if(!viewedCollection.value) throw new Error('ERROR: Collection data is missing!');
        collections_updatePhotos(viewedCollection.value.releaseId, deletedPhotos);
        viewedCollection_set(userCollections.value.find((collection: CollectionResponseModel) => collection.releaseId === viewedCollection.value!.releaseId));
        viewedCollection.value = viewedCollection_get();
    }

/*     watch(viewedCollection, () => {
        if(!viewedCollection.value) return;
        viewedCollection_set(viewedCollection.value);
    }) */

    onBeforeMount(() => {
        console.log('HI ! MY COLLECTION: ', viewedCollection_get());
        if(!viewedCollection.value) throw new Error('ERROR: Collection data is missing!');
    })

    onUnmounted(() => {
        collectionsOrlikedPhotos_setEditMode(false);
    })

</script>

<template>
    <NavigationBar />

    <section class="min-h-screen my-12 mx-4">
        <section class="mx-[10vw] mb-3 text-center">
            <h1 class="text-5xl font-bold mb-8 break-words leading-12 max-w-screen"> {{ viewedCollection?.name }} </h1>
            <p class="text-lg py-3"> {{ viewedCollection?.description }}  </p>
        </section>
        
        <section class="grid grid-rows-1 grid-cols-[1fr_auto_1fr] items-center">
            <div class="bg-black h-[0.15rem] mr-3 shadow-xl shadow-black"></div>
            <div class="flex items-center justify-start w-fit py-6 px-4 mt-6 mb-8 mx-auto border-black rounded-md border-2">
                <FontAwesomeIcon :icon="faFolder" class="text-5xl mr-4 drop-shadow-[0rem_0rem_0.20rem_#222d]" :class="`text-[${viewedCollection?.folderColor}]`"></FontAwesomeIcon>
                <h2 class="text-4xl font-semibold ml-3"> {{ viewedCollection?.collectionPhotos.length }} / {{ getPhotosInCollectionLimit() }} </h2>
            </div>
            <div class="bg-black h-[0.15rem] ml-3 shadow-xl shadow-black"></div>
        </section>


        <Transition> 
            <div v-if="isRequestPending"> <Loading /> </div>
            <div v-else-if="!viewedCollection?.collectionPhotos.length"> <NoResults /> </div>
            <div v-else-if="viewedCollection.collectionPhotos.length">
                <div v-if="!isRequestPending" class="">
                    <!-- Slicing works well for providers API, which reqire minimal response photos, while this app does not  -->
                    <PhotoItem v-for="(image, index) in viewedCollection.collectionPhotos" :key="image.id" :imgData="image.photoDetails" :provider="image.provider" />
                </div>
                <div v-if="isRequestPending" class="">
                    <p class="text-2xl bold text-yellow-400"> Pending... Please wait 🥰</p>
                </div>
            </div>
        </Transition>

        <section>

        </section>
    </section>

    <ModalsAddOrEditCollection  v-if="isEditCollectionModalOpen" :isEditMode="true" 
        @edit="handleEditCollection" 
        @modalClose="closeEditCollectionModal" 
    />

    <LikedOrSavedPhotosEditPanel v-if="collectionsOrlikedPhotos_isEditModeOn" storageType="collection" @photosRemove="handleCurrentPhotosUpdate"  />
    <PanelsCollectionActionPanel v-else @openEditCollection="openEditCollectionModal" />

</template>

<style scoped>

</style>