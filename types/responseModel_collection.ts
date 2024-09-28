import type PhotoResponseModel from "./responseModel_photo"

export default interface CollectionResponseModel {
    id: string,
    userId: string,
    releaseId: number,
    name: string,
    description: string,
    folderColor: string,
    collectionDetails: collectionDetailsObject,
    collectionPhotos: PhotoResponseModel[]
};

export type collectionDetailsObject = {
    createdAt: string,
}