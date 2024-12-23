<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faFolder, faMinusCircle, faInfoCircle, faShareAltSquare, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
    import type CollectionResponseModel from '~/types/responseModel_collection';
    
    const { currentUser_get, collections_add, collections_delete } = useAuthStore();
    const { viewedCollection_set } = useCollectionStore();
    const { currentBreakpoint } = storeToRefs(useStatusStore());

    const isAddCollectionModalOpen = ref<boolean>(false);
    const collectionToDeleteData = ref<false | CollectionResponseModel>(false);

    const isTeleportReady = ref<boolean>(false);
    const allCollectionsContainerElement = ref();
    const navBarElement = ref();

    // Used to determine if page content requires a Y-scrollbar to be used 
    const isContentOverflow = ref<boolean>(false);

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

    function testContentOverflow(): boolean {
        const [allCollectionsContainerHeight, navbarHeight] = [
            allCollectionsContainerElement?.value?.scrollHeight || 0,
            navBarElement?.value.navBarContainerRef.offsetHeight || 0
        ];
        if((document.body.scrollHeight + allCollectionsContainerHeight + navbarHeight) > window.screen.height) return true;
        if(document.body.scrollHeight + navbarHeight < window.screen.height) return false;
        if(userCollections.value.length) return true;
        return false;
    }

    watch(userCollections, () => {
        isContentOverflow.value = testContentOverflow();
    })

    onMounted(() => {
        isTeleportReady.value = true;
        isContentOverflow.value = testContentOverflow();
    })

    onUpdated(() => {
        isContentOverflow.value = testContentOverflow();
    })

    // Used for <Teleport> functionality
    const checkTeleportConditions = computed(() => { return testTeleportConditions(currentBreakpoint.value, isTeleportReady.value); })

</script>

<template>
    <NavigationBar  ref="navBarElement" />

    <section class="my-12 mx-4 min-h-fit" :class="isContentOverflow && `min-h-screen`">

        <section class="mx-[5vw] mb-6 text-center">
            <div class="mx-auto
                md:max-w-[500px]
                lg:max-w-[660px]
            ">
                <h1 class="text-4xl mb-8 break-words leading-12 max-w-screen
                    lg:text-5xl
                "> Your collections </h1>
                <p class="py-2 text-base
                    lg:py-5 lg:text-lg
                "> Here you can find the list of all collections you have created. Optionally, you can also add an empty collection. You may also click on the specific collection to view its photos, edit the collection and more!   </p>
            </div>
        </section>

        <div v-if="!userCollections.length"> <EmptyResponsesNoCollections /> </div>
        <div v-else ref="allCollectionsContainerElement" class="">
            <ResultCollectionsContainer :collections-array="userCollections"
                @set-collection-as-viewed="handleSetCollectionAsViewed"
                @try-to-delete-collection="handleTryToDeleteCollection"
            />
        </div>

    </section>

    <ModalsAddOrEditCollection  v-if="isAddCollectionModalOpen" :isEditMode="false" 
        @add="handleAddCollection" 
        @modalClose="closeAddCollectionModal" 
    />

    <ModalsDeleteCollection v-if="collectionToDeleteData" :collectionData="collectionToDeleteData"
        @modal-close="handleCancelDeleteCollection"
        @confirm-delete="handleConfirmDeleteCollection"
    />
    

    <Teleport to="#top-panel-teleport" v-if="checkTeleportConditions" >
        <PanelsCollectionsMainPanel @openAddCollection="openAddCollectionModal" :isContentOverflow="isContentOverflow"
            :class="getTeleportedPanelClasses()" :disable-blur="true"
        />
    </Teleport>

    <PanelsCollectionsMainPanel v-else @openAddCollection="openAddCollectionModal" :isContentOverflow="isContentOverflow" />

</template>

<style scoped>
    ._custom-text-shadow {
        text-shadow: .15rem .15rem .1rem #999;
    }
</style>