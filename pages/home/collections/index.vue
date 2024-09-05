<script setup lang="ts">

    const isAddCollectionModalOpen = ref<boolean>(false);

    const closeAddCollectionModal = () => isAddCollectionModalOpen.value = false;
    const openAddCollectionModal = () => isAddCollectionModalOpen.value = true;

</script>

<template>
    <NavigationBar />

    <section class="min-h-screen my-12 mx-4">
        <h1 class="text-4xl font-bold mb-6"> Your collections </h1>
        <p class="py-3"> Here you can find the list of all collections you have created. Optionally, you can also add an empty collection.   </p>
        <p class="py-3"> You may also click on the specific collection to view its photos, edit the collection and more! </p>
    </section>

    <ModalsAddOrEditCollection  v-if="isAddCollectionModalOpen" :isEditMode="false" @modalClose="closeAddCollectionModal" />
    
    <PanelsCollectionsMainPanel @openAddCollection="openAddCollectionModal" />
</template>

<style scoped>

</style>