<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faFolder } from '@fortawesome/free-solid-svg-icons';
    import type CollectionResponseModel from '~/types/responseModel_collection';
    
    onMounted(() => { console.warn('C---  : ', viewedCollection_get()) });

    definePageMeta({
        middleware: 'handle-single-collection-id'
    });

    const { viewedCollection_get, viewedCollection_set } = useCollectionStore();
    const { currentUser_get, collections_edit } = useAuthStore();

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

</script>

<template>
    <NavigationBar />

    <section class="min-h-screen my-12 mx-4">
        <h1 class="text-4xl font-bold mb-6"> {{ viewedCollection?.name }} </h1>
        <p class="py-3"> {{ viewedCollection?.description }}  </p>
        <p class="py-3"> FOLDER COLOR: {{ viewedCollection?.folderColor }} </p>
    </section>

    <ModalsAddOrEditCollection  v-if="isEditCollectionModalOpen" :isEditMode="true" 
        @edit="handleEditCollection" 
        @modalClose="closeEditCollectionModal" 
    />

    <PanelsCollectionActionPanel @openEditCollection="openEditCollectionModal" />

</template>

<style scoped>

</style>