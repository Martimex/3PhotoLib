<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faFolder, faMinusCircle, faInfoCircle, faShareAltSquare, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
    import type CollectionResponseModel from '~/types/responseModel_collection';
    
    const { currentUser_get, collections_add, collections_delete } = useAuthStore();
    const { viewedCollection_set } = useCollectionStore();

    const isAddCollectionModalOpen = ref<boolean>(false);
    const collectionToDeleteData = ref<false | CollectionResponseModel>(false);

    const userCollections = ref(currentUser_get()?.collections);

    const closeAddCollectionModal = () => isAddCollectionModalOpen.value = false;
    const openAddCollectionModal = () => isAddCollectionModalOpen.value = true;

    function handleAddCollection(newCollection: CollectionResponseModel) {
        collections_add(newCollection);
        userCollections.value = currentUser_get()?.collections;
    }

    function handleSetCollectionAsViewed(clickedCollection: CollectionResponseModel) {
        viewedCollection_set(clickedCollection);
    }

    function handleTryToDeleteCollection(clickedCollection: CollectionResponseModel) {
        collectionToDeleteData.value =  clickedCollection;
    }

    function handleCancelDeleteCollection() {
        collectionToDeleteData.value = false;
    }

    function handleConfirmDeleteCollection(deletedCollection: CollectionResponseModel) {
        collections_delete(deletedCollection);
        userCollections.value = currentUser_get()?.collections;
    }

</script>

<template>
    <NavigationBar />

    <section class="min-h-screen my-12 mx-4">
        <h1 class="text-4xl font-bold mb-6"> Your collections </h1>
        <p class="py-3 text-base"> Here you can find the list of all collections you have created. Optionally, you can also add an empty collection.   </p>
        <p class="py-3 text-base"> You may also click on the specific collection to view its photos, edit the collection and more! </p>

        <CollectionPreviewListItem v-for="collection in userCollections" :key="collection.id"  :collectionData="collection" 
            @set-collection-as-viewed="handleSetCollectionAsViewed(collection)"
            @try-to-delete-collection="handleTryToDeleteCollection(collection)"
        /> 

<!--         <div class="flex flex-col my-12">
            <div v-for="collection in userCollections" :key="collection.id" class="grid grid-cols-[auto_1fr] place-items-start my-4 gap-x-9">
                <div class="flex items-center justify-center h-full">
                    <FontAwesomeIcon :icon="faFolder" class="text-[25vw] width-full block drop-icon m-auto px-1 drop-shadow-[0rem_0rem_0.20rem_#222d]" :class="`text-[${collection.folderColor}]`" ></FontAwesomeIcon>
                </div>
                <div class="flex flex-col justify-center py-4">
                    <p class="text-2xl font-semibold text-wrap overflow-hidden break-all my-2"> {{ collection.name }} </p>
                    <p class="text-lg"> 30 / 50 </p>
                </div>

            </div>
        </div> -->

<!--         <div class="grid grid-cols-2 gap-6 grid-rows-auto place-items-center my-12">
            <div v-for="collection in userCollections" :key="collection.id">
                <FontAwesomeIcon :icon="faFolder" class="text-[20vw] width-full block drop-icon m-auto px-1 drop-shadow-[0rem_0rem_0.20rem_#222d]" :class="`text-[${collection.folderColor}]`" ></FontAwesomeIcon>
                <p class="text-xl font-semibold text-center text-wrap overflow-hidden break-all my-2"> {{ collection.name.toLowerCase() }} </p>
            </div>
        </div>  -->
    </section>

    <ModalsAddOrEditCollection  v-if="isAddCollectionModalOpen" :isEditMode="false" 
        @add="handleAddCollection" 
        @modalClose="closeAddCollectionModal" 
    />

    <ModalsDeleteCollection v-if="collectionToDeleteData" :collectionData="collectionToDeleteData"
        @modal-close="handleCancelDeleteCollection"
        @confirm-delete="handleConfirmDeleteCollection"
    />
    
    <PanelsCollectionsMainPanel @openAddCollection="openAddCollectionModal" />
</template>

<style scoped>
    ._custom-text-shadow {
        text-shadow: .15rem .15rem .1rem #999;
    }
</style>