<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faFolder } from '@fortawesome/free-solid-svg-icons';
    import { getPhotosInCollectionLimit } from '#imports';
    import type CollectionResponseModel from '~/types/responseModel_collection';
    import type PhotoResponseModel from '~/types/responseModel_photo';
    import LikedOrSavedPhotosEditPanel from '~/components/Panels/LikedOrSavedPhotosEditPanel.vue';
    
    definePageMeta({
        middleware: 'handle-single-collection-id'
    });

    const sStore = useStatusStore();
    const { viewedCollection_get, viewedCollection_set } = useCollectionStore();
    const { collectionsOrlikedPhotos_setEditMode, photosToRemoveArray_reset } = useStatusStore();
    const { currentUser_get, collections_edit, collections_updatePhotos } = useAuthStore();
    const { isRequestPending, collectionsOrlikedPhotos_isEditModeOn, currentBreakpoint } = storeToRefs(sStore);
    const { viewedCollection } = storeToRefs(useCollectionStore());
    const { currPhotoProviderName } = useSearchQueryStore();

    const isTeleportReady = ref<boolean>(false);
    const isEditCollectionModalOpen = ref<boolean>(false);

    const collectionPhotosContainerElement = ref();
    const navBarElement = ref();

    // Used to determine if page content requires a Y-scrollbar to be used 
    const isContentOverflow = ref<boolean>(false);
    
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

    function testContentOverflow(): boolean {
        const [collectionPhotosContainerHeight, navbarHeight] = [
            collectionPhotosContainerElement?.value?.scrollHeight || 0,
            navBarElement?.value.navBarContainerRef.offsetHeight || 0
        ];
        if((document.body.scrollHeight + collectionPhotosContainerHeight + navbarHeight) > window.screen.height) return true;
        if(document.body.scrollHeight + navbarHeight < window.screen.height) return false;
        if(viewedCollection?.value?.collectionPhotos?.length) return true;
        return false;
    }

    onMounted(() => {
        isTeleportReady.value = true;
        isContentOverflow.value = testContentOverflow();
    })

    onUpdated(() => {
        isContentOverflow.value = testContentOverflow();
    })

    onBeforeMount(() => {
        if(!viewedCollection.value) throw new Error('ERROR: Collection data is missing!');
    })

    onUnmounted(() => {
        viewedCollection_set(null);
        collectionsOrlikedPhotos_setEditMode(false);
    })

    // Used for <Teleport> functionality
    const checkTeleportConditions = computed(() => { return testTeleportConditions(currentBreakpoint.value, isTeleportReady.value); })

</script>

<template>
    <NavigationBar ref="navBarElement" />

    <section class="my-12 mx-4">
        <section class="mx-[5vw] mb-3 text-center">
            <div class="mx-auto
                md:max-w-[500px]
                lg:max-w-[660px]
            ">
                <h1 class="text-4xl mb-8 break-words leading-12 max-w-screen break-all
                    lg:text-5xl
                "> {{ viewedCollection?.name }} </h1>
                <p class="py-2 text-base
                    lg:py-5 lg:text-lg
                "> {{ viewedCollection?.description }}  </p>
            </div>
        </section>
        
        <section class="grid grid-rows-1 grid-cols-[1fr_auto_1fr] items-center">
            <div class="bg-black h-[0.15rem] mr-3 shadow-xl shadow-black w-full justify-self-end
                sm:max-w-[250px]
                md:max-w-[290px] md:mr-6
                lg:max-w-[330px] lg:mr-9
            "></div>
            <div class="w-fit mt-6 mb-8 mx-auto border-black rounded-md border-2">
                <div v-if="viewedCollection?.collectionPhotos.length" class="flex items-center justify-start py-6 px-4">
                    <FontAwesomeIcon :icon="faFolder" class="text-4xl mr-4 drop-shadow-[0rem_0rem_0.20rem_#222d]" :class="`text-[${viewedCollection?.folderColor}]`"></FontAwesomeIcon>
                    <h2 class="text-3xl font-semibold ml-3"> {{ viewedCollection?.collectionPhotos.length }} / {{ getPhotosInCollectionLimit() }} </h2>
                </div>
            </div>
            <div class="bg-black h-[0.15rem] ml-3 shadow-xl shadow-black w-full
                sm:max-w-[250px]
                md:max-w-[290px] md:ml-6
                lg:max-w-[330px] lg:ml-9
            "></div>
        </section>


        <Transition> 
            <div v-if="isRequestPending"> <Loading /> </div>
            <div v-else-if="!viewedCollection?.collectionPhotos.length"> <EmptyResponsesNoPhotosInCollection/> </div>
            <div v-else-if="viewedCollection?.collectionPhotos.length">
                <div v-if="!isRequestPending" ref="collectionPhotosContainerElement" class="">
                    <ResultPhotosContainer :photosArray="viewedCollection?.collectionPhotos" :providerName="currPhotoProviderName" />
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

    <Teleport to="#top-panel-teleport" v-if="checkTeleportConditions" >
        <div>
            <LikedOrSavedPhotosEditPanel v-if="collectionsOrlikedPhotos_isEditModeOn" :isContentOverflow="isContentOverflow" storageType="collection" @photosRemove="handleCurrentPhotosUpdate"  
                :class="getTeleportedPanelClasses()" :disable-blur="true"
            />
            <PanelsCollectionActionPanel v-else @openEditCollection="openEditCollectionModal" :isContentOverflow="isContentOverflow"
                :class="getTeleportedPanelClasses()" :disable-blur="true"
            />
        </div>
    </Teleport>

    <div v-else>
        <LikedOrSavedPhotosEditPanel v-if="collectionsOrlikedPhotos_isEditModeOn" :isContentOverflow="isContentOverflow" storageType="collection" @photosRemove="handleCurrentPhotosUpdate"  />
        <PanelsCollectionActionPanel v-else @openEditCollection="openEditCollectionModal" :isContentOverflow="isContentOverflow" :class="getTeleportedPanelClasses()" :disable-blur="false" />
    </div>

</template>

<style scoped>

</style>