export default interface CollectionResponseModel {
    id: string,
    userId: string,
    releaseId: number,
    name: string,
    description: string,
    folderColor: string,
    collectionDetails: collectionDetailsObject
};

export type collectionDetailsObject = {
    createdAt: string,
}