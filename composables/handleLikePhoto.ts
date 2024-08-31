import type { availablePhotoTypes, availableProviderNames } from '@/types/type_utilities';
import likeThePhoto from './likeThePhoto';
import keepPhotoAsUnliked from './keepPhotoAsUnliked';

export default async function handleLikePhoto({isPhotoLiked, imgData, provider}: {isPhotoLiked: boolean, imgData: availablePhotoTypes, provider:  availableProviderNames}, isPhotoLikedRef: globalThis.Ref<boolean>) {
    
    const { currentUser_get, currentUser_set, likedPhotos_update } = useAuthStore();
    const { asyncProcess_get, asyncProcess_set, likedPhotos_setEditMode } = useStatusStore();
    const { photoIdToUnlike_set } = usePhotoStore();

    const currentUser = currentUser_get();
    if(!currentUser) { throw new Error('User not found! Photo cannot be further liked')}

    if(asyncProcess_get()) { 
        // Here, beside returning we will have to add a dialog box to inform user that a process is currently running
        return; 
    }

    if(isPhotoLiked) {
        // Handle showup of liked photos deletion panel and automatically mark the unliked photo as a removed one
        /* if(typeof eventEmitter === 'function') { eventEmitter('photoDislike', `${provider}=${imgData.id}`); } */
        /* else { keepPhotoAsUnliked(eventEmitter, `${provider}=${imgData.id}`) } */
        keepPhotoAsUnliked(isPhotoLikedRef, {id: '', provider: provider, photoId: `${provider}=${imgData.id}`, photoDetails: imgData})
        const currentRoute = useRoute().name;
        if(currentRoute) {
            const routeName = currentRoute as string; 
            const routeParts =  routeName.split('-');
            const lastRoutePart = routeParts[routeParts.length - 1];

            if(lastRoutePart !== 'liked') {
                photoIdToUnlike_set(`${provider}=${imgData.id}`);
                // Perform a redirect ot a /liked endpoint 

                const currentUser = await $fetch('/account/getData', { method: 'post'});

                if(currentUser) {
                    currentUser_set(currentUser.id, currentUser.name, currentUser.email, currentUser.profile_image, currentUser.member_since, currentUser.likedPhotos, currentUser.collections);
                }

                await navigateTo('/home/liked');
            }

            likedPhotos_setEditMode(true);
        }
    }

    
    else {
        asyncProcess_set(true);
        /* if(typeof eventEmitter === 'function') { eventEmitter('photoLike'); } */
        /* else { likeThePhoto(isPhotoLikedRef); } */
        likeThePhoto(isPhotoLikedRef);
        // LOCAL UPDATE
        likedPhotos_update('add', [{id: '', provider: provider, photoId: `${provider}=${imgData.id}`, photoDetails: imgData}]);

        // SERVER UPDATE
        await $fetch('/photo/like', { method: 'post', body: {
            userData: currentUser,
            photoData: imgData,
            photoID: `${provider}=` + imgData.id,
            provider: provider
        }});
        asyncProcess_set(false);
    }
}