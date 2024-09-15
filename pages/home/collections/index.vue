<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faFolder } from '@fortawesome/free-solid-svg-icons';
    import type CollectionResponseModel from '~/types/responseModel_collection';
    
    const { currentUser_get, collections_add } = useAuthStore();
    const { viewedCollection_set } = useCollectionStore();

    const isAddCollectionModalOpen = ref<boolean>(false);

    const userCollections = ref(currentUser_get()?.collections);

    const closeAddCollectionModal = () => isAddCollectionModalOpen.value = false;
    const openAddCollectionModal = () => isAddCollectionModalOpen.value = true;

    onMounted(() =>  { console.error('USER COLL: ', userCollections.value)});

    function handleAddCollection(newCollection: CollectionResponseModel) {
        collections_add(newCollection);
        userCollections.value = currentUser_get()?.collections;
    }

    function setCollectionAsViewed(clickedCollection: CollectionResponseModel) {
        viewedCollection_set(clickedCollection);
    }

</script>

<template>
    <NavigationBar />

    <section class="min-h-screen my-12 mx-4">
        <h1 class="text-4xl font-bold mb-6"> Your collections </h1>
        <p class="py-3"> Here you can find the list of all collections you have created. Optionally, you can also add an empty collection.   </p>
        <p class="py-3"> You may also click on the specific collection to view its photos, edit the collection and more! </p>

        <div>
            <div v-for="collection in userCollections" :key="collection.id" class="mt-6 mb-16" >
                <div class="grid grid-rows-1 grid-cols-[1fr_auto_1fr] items-center">
                    <div class="bg-black h-[0.15rem] mr-3 shadow-xl shadow-black"></div>
                    <h2 class="text-2xl font-semibold text-wrap break-all my-2 text-center border-black rounded-full border-2 py-2 px-4 shadow-[0.25rem_0.25rem_0.3rem_#222d]"> {{ collection.name }}</h2>
                    <div class="bg-black h-[0.15rem] ml-3 shadow-xl shadow-black"></div>
                </div>
                <div class="grid grid-cols-[auto_1fr] my-4 gap-x-9">
                    <NuxtLink :to="{name: 'home-collections-id', params: { id: collection.releaseId}}" >
                        <FontAwesomeIcon :icon="faFolder" class="text-[25vw] width-full block drop-icon m-auto px-1 drop-shadow-[0.25rem_0.25rem_0.3rem_#222d]" :class="`text-[${collection.folderColor}]`" 
                            @click="setCollectionAsViewed(collection)"
                        >
                        </FontAwesomeIcon>
                    </NuxtLink>
                    <div class="flex flex-col align-start justify-center">
                        <span class="text-lg block"> Created at: <p class="text-lg font-semibold inline"> {{ collection.collectionDetails.createdAt }} </p> </span>
                        <span class="text-lg block"> Collection size: <p class="text-lg font-semibold inline"> 30 / 50 </p> </span>
                    </div>
                </div>
            </div>
        </div>

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
    
    <PanelsCollectionsMainPanel @openAddCollection="openAddCollectionModal" />
</template>

<style scoped>

</style>