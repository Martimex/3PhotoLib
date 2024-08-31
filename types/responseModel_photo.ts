import type { availablePhotoTypes, availableProviderNames } from "./type_utilities";

export default interface PhotoResponseModel {
    id?: string,
    provider: availableProviderNames,
    photoId: string,
    photoDetails: availablePhotoTypes
};