import type CollectionResponseModel from "~/types/responseModel_collection";


export default defineNuxtRouteMiddleware(async(to, from) => { 

    const { currentUser_get } = useAuthStore();
    const { viewedCollection_set, viewedCollection_get } = useCollectionStore();

    // If we visit the /id route from UI, then we should not proceed further over here
    if(viewedCollection_get()) { return; }

    const currentUser = currentUser_get();

    if(currentUser) {
        // Check the validity of the URL ID param - if it is not a number, then throw an error
        const collectionID = to.params.id as string;
        const isQueryParamValid = /^[1-9]+[0-9]*$/.test(collectionID);
        if(!isQueryParamValid) { throwError(409, 'Provided collection ID contains an incorrect format.'); }

        // Now test that the requested collection ID actually belongs to the logged user - otherwise, throw an error
        const doesCollectionIDBelongToUser = currentUser.collections.find((collection: CollectionResponseModel) => collection.releaseId === parseInt(collectionID))
        if(!doesCollectionIDBelongToUser) { throwError(409, 'This collection either does not exist yet or its owned by other user.') }

        // All checks are OK! Now we can safely fetch the collection from DB
        const targetCollection = await $fetch(`/collection/getData`, { method: 'post', body: {
            collectionID: collectionID,
            userID: currentUser.id
        }}) as CollectionResponseModel;

        // Finally, update proper state variable with a query result data
        viewedCollection_set(targetCollection);

    } else throwError(409, 'Cannot find user data to perform the requested collection lookup.')
    
    function throwError(errorNo: number, info?: string) {
        throw createError({
            statusCode: errorNo,
            statusMessage: info    
        });
    }

    console.warn('etg :', currentUser_get());
});