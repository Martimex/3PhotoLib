import type { availablePhotoTypes, orderedCollectionsPhotoIDs, userData } from "~/types/type_utilities";
import type PhotoResponseModel from "~/types/responseModel_photo"
import type CollectionResponseModel from "~/types/responseModel_collection";
import { sortById } from "#imports";

export const useAuthStore = defineStore('auth', () => {

    const isAuthenticated = ref<boolean>(false);
    const currentUser = ref<null | userData>(null); 
    const likedPhotosOrdered = ref<string[]>([]); 
    const collectionsOrdered = ref<orderedCollectionsPhotoIDs>({});

    // We will store a copy of cookie value in case when user manually changes the cookie. In crucial parts there will be performed
    // a check if cookie value equals this varaible value. If they mismatch or cookie is not present (user deletes it), user will be
    // redirected to the Login Page regardless
    //const sessionCurrentUser: string = '';

    function isAuthenticated_get(): boolean {
        return isAuthenticated.value;
    }

    function isAuthenticated_set(val: boolean): void {
        isAuthenticated.value = val;
    }

    function currentUser_get(): userData | null {
        return currentUser.value;
    }

    function currentUser_set(id: string, name: string, email: string, profileImage: string, memberSince: string, likedPhotos: PhotoResponseModel[], collections: CollectionResponseModel[]): void {
        currentUser.value = {
            id,
            name,
            email,
            profileImage,
            memberSince,
            likedPhotos,
            collections
        }

        // This two methods will most likely NOT be exposed outside of the store
        likedPhotos_sortAscending([...likedPhotos]);
        collections_sortAscending([...collections]);
    }

    function likedPhotos_update(action: 'add' | 'remove', photosArr: PhotoResponseModel[]) {
        if(!currentUser.value) return;
        const currentlyLikedPhotos = currentUser.value.likedPhotos;
        if(action === 'add') {
            currentUser.value.likedPhotos = [...currentlyLikedPhotos, ...photosArr];
        } else if(action === 'remove') {
            const photosArr_onlyPhotoIDs = photosArr.map(el => el.photoId);
            const likedPhotosUpdated = [...currentUser.value.likedPhotos].filter(el => 
                {    
                    return Boolean(!findId(el.photoId, sortById(photosArr_onlyPhotoIDs)));
                }
            );
            currentUser.value.likedPhotos = likedPhotosUpdated;
        }

        // Last off, sync the order version with current, local likedPhotos array
        likedPhotos_sortAscending([...currentUser.value.likedPhotos]);
    }


    function likedPhotos_sortAscending(array: PhotoResponseModel[]) {
        const likedPhotos_IDs = array.map(likedPhoto => likedPhoto.photoId)
        likedPhotosOrdered.value = sortById(likedPhotos_IDs);
    }

    function likedPhotosOrdered_get(): string[] {
        return likedPhotosOrdered.value;
    }

    function likedPhotos_set(newValue: availablePhotoTypes[]): void {
        if(!currentUser.value) return;
        currentUser.value.likedPhotos = newValue;
    }

    //---------------------------------------------------------------------------

    function collections_updatePhotos(collectionReleaseID: number, photosToRemoveArr: PhotoResponseModel[]) {
        // This one is for removing photos only (BUT NOT REMOVING THE COLLECTION ITSELF)
        if(!currentUser.value) return;
        const currentCollectionToBeUpdated_index = currentUser.value.collections.findIndex((col: CollectionResponseModel) => col.releaseId === collectionReleaseID);
        const photosToRemoveArr_onlyPhotoIDs_sorted = sortById(photosToRemoveArr.map(el => el.photoId));
        const collectionPhotosUpdated = [...currentUser.value.collections[currentCollectionToBeUpdated_index].collectionPhotos].filter(el => {
            return Boolean(!findId(el.photoId, photosToRemoveArr_onlyPhotoIDs_sorted));
        });

        currentUser.value.collections[currentCollectionToBeUpdated_index].collectionPhotos = collectionPhotosUpdated;

        // Last off, sync the order version with current, local likedPhotos array
        singleCollection_sortAscending(currentUser.value.collections[currentCollectionToBeUpdated_index]);
    }

    function singleCollection_sortAscending(collectionToUpdate: CollectionResponseModel) {
        const collectionsOrdered_deepCopy = JSON.parse(JSON.stringify(collectionsOrdered.value));
        collectionsOrdered_deepCopy[collectionToUpdate.releaseId] = sortById(collectionToUpdate.collectionPhotos.map(photo => photo.photoId));

        collectionsOrdered.value = collectionsOrdered_deepCopy;
    }

    function collections_sortAscending(allCollectionsObj: CollectionResponseModel[] /* orderedCollectionsPhotoIDs */) {
        const orderedObjForUpdate: orderedCollectionsPhotoIDs  = {};
        const allCollectionsKeys = allCollectionsObj.map(collection => collection.releaseId);
        for(let collectionKeyNo=0; collectionKeyNo<allCollectionsKeys.length; collectionKeyNo++ ) {
            const currentCollectionToBeSorted = allCollectionsObj.find((col => col.releaseId === allCollectionsKeys[collectionKeyNo]))
            if(currentCollectionToBeSorted) {
                orderedObjForUpdate[allCollectionsKeys[collectionKeyNo]] = sortById(currentCollectionToBeSorted.collectionPhotos.map(photo => photo.photoId));
            }
            else { /*This should generally never happen. its for debugging purposes */ throw new Error('Error while trying to sort collection photo IDs'); }
        }
        collectionsOrdered.value =  orderedObjForUpdate;
    }

    function collectionsOrdered_get(): orderedCollectionsPhotoIDs {
        return collectionsOrdered.value;
    }

    function collections_add(newCollection: CollectionResponseModel) {
        if(!currentUser.value) { return; }
        currentUser.value.collections = [...currentUser.value.collections, newCollection];
    }

    function collections_edit(collectionEditData: CollectionResponseModel) {
        if(!currentUser.value) { return; }
        const outDatedCollectionIndex = currentUser.value.collections.findIndex((collection: CollectionResponseModel) => collection.releaseId === collectionEditData.releaseId)
        if(outDatedCollectionIndex < 0) { return; }
        currentUser.value.collections[outDatedCollectionIndex] = collectionEditData;
    }

    function collections_delete(deletedCollection: CollectionResponseModel) {
        if(!currentUser.value) { return; }
        const deletedCollectionIndex = currentUser.value.collections.findIndex((collection: CollectionResponseModel) => collection.releaseId === deletedCollection.releaseId);
        if(deletedCollectionIndex < 0) { return; /* Normally, it should never happen */}
        const userCollections_copy = [...currentUser.value.collections].toSpliced(deletedCollectionIndex, 1);
        currentUser.value.collections = userCollections_copy;
    }

    function currentUser_clear() {
        currentUser.value = null;
    }

    function authenticateUser(name: string) {
        //currentUser.value = name;
        isAuthenticated.value = true;
    };

    return { isAuthenticated_get, isAuthenticated_set, currentUser_get, currentUser_set, currentUser_clear,  authenticateUser,
        likedPhotosOrdered_get, collectionsOrdered_get,
        likedPhotos_set, likedPhotos_update, 
        collections_add, collections_edit, collections_delete, collections_updatePhotos
    };
})