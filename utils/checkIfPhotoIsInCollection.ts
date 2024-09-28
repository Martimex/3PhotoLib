import type CollectionResponseModel from "~/types/responseModel_collection";
// Checks if photo belongs to a collection (by a given PhotoID)


export const checkIfPhotoIsInCollection = function(collection: CollectionResponseModel, photoID: string): boolean {
    const isPhotoIDPresentInCollection = collection.collectionPhotos.find((photo) => photoID === photo.photoId);
    return isPhotoIDPresentInCollection? true : false;
}