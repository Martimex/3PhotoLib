import type { accountLimitationsData } from "~/types/type_utilities";

const ACCOUNT_LIMITATIONS: accountLimitationsData = {
    COLLECTIONS_LIMIT: 8,
    PHOTOS_IN_COLLECTION_LIMIT: 50,
    LIKED_PHOTOS_LIMIT: 100,
    USERACCOUNT_RANDOMLIKEDPHOTOSVIEWED_LIMIT: 6,
    USERACCOUNT_RANDOMCOLLECTIONSVIEWED_LIMIT: 6,
}

export const getCollectionsLimit = () => ACCOUNT_LIMITATIONS.COLLECTIONS_LIMIT;
export const getPhotosInCollectionLimit = () => ACCOUNT_LIMITATIONS.PHOTOS_IN_COLLECTION_LIMIT;
export const getLikedPhotosLimit = () => ACCOUNT_LIMITATIONS.LIKED_PHOTOS_LIMIT;
export const getRandomLikedPhotosViewedLimit = () => ACCOUNT_LIMITATIONS.USERACCOUNT_RANDOMLIKEDPHOTOSVIEWED_LIMIT;
export const getRandomCollectionsViewedLimit = () => ACCOUNT_LIMITATIONS.USERACCOUNT_RANDOMCOLLECTIONSVIEWED_LIMIT;