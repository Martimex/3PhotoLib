export default interface CollectionResponseModel {
    id: string,
    userId: string,
    name: string,
    description: string,
    folderColor: string,
    collectionDetails: collectionDetailsObject
};

export type collectionDetailsObject = {
    createdAt: string,
}