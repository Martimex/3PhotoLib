import type { accountLimitationsData } from "~/types/type_utilities";

const ACCOUNT_LIMITATIONS: accountLimitationsData = {
    COLLECTIONS_LIMIT: 8,
    PHOTOS_IN_COLLECTION_LIMIT: 50,
    LIKED_PHOTOS_LIMIT: 100
}

export const getCollectionsLimit = () => ACCOUNT_LIMITATIONS.COLLECTIONS_LIMIT;
export const getPhotosInCollectionLimit = () => ACCOUNT_LIMITATIONS.PHOTOS_IN_COLLECTION_LIMIT;
export const getLikedPhotosLimit = () => ACCOUNT_LIMITATIONS.LIKED_PHOTOS_LIMIT;