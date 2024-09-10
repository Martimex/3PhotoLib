import type { availablePhotoTypes, userData } from "~/types/type_utilities";
import type PhotoResponseModel from "~/types/responseModel_photo"
import type CollectionResponseModel from "~/types/responseModel_collection";
import { sortById } from "#imports";

export const useAuthStore = defineStore('auth', () => {

    const isAuthenticated = ref<boolean>(false);
    const currentUser = ref<null | userData>(null); 
    const likedPhotosOrdered = ref<string[]>([]); 
    const collectionsOrdered = ref<string[][]>([]);

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

    function currentUser_set(id: string, name: string, email: string, profileImage: string, memberSince: string, likedPhotos: any, collections: any): void {
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
                    return Boolean(!findId(el.photoId, photosArr_onlyPhotoIDs));
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

    function collections_sortAscending(arrayOfCollections: PhotoResponseModel[][]) {
        // Reset the state and then reapply the sorted collections
        collectionsOrdered.value = [];
        console.warn('arrayofCollections; ', arrayOfCollections);

        return; 

        for(let i=0; i<arrayOfCollections.length; i++) {
            const collection_photoIDs = arrayOfCollections[i].map(collectionPhoto => collectionPhoto.photoId);
            collectionsOrdered.value.push(sortById(collection_photoIDs));
        }
    }

    function collectionsOrdered_get(): string[][] {
        return collectionsOrdered.value;
    }

    function collections_add(newCollection: CollectionResponseModel) {
        if(!currentUser.value) { return; }
        currentUser.value.collections = [...currentUser.value.collections, newCollection];
    }

    function collections_set(): void {

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
        collections_set, collections_add
    };
})