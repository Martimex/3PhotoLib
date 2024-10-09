import type CollectionResponseModel from "~/types/responseModel_collection";
import type { collectionStateCheckObject, collectionStates,  } from "~/types/type_utilities";


function useCollectionState() {
    return {
        base: function(): true { return true; },
        moveFrom: function(collection: CollectionResponseModel, isMoveToMode: boolean, dependenciesObj: collectionStateCheckObject): boolean {
            if(!isMoveToMode || !dependenciesObj.collection_viewed) return false;
            else return collection.releaseId === dependenciesObj.collection_viewed.releaseId;
        },
        hasThatPhoto: function(collection: CollectionResponseModel, dependenciesObj: collectionStateCheckObject): boolean {
            return collection.collectionPhotos.find(photo => photo.photoId === dependenciesObj.image_targetID)? true : false;
        },
        maxPhotos: function(collection: CollectionResponseModel, dependenciesObj: collectionStateCheckObject): boolean {
            return collection.collectionPhotos.length === dependenciesObj.limit_photosInCollection;
        },  
        addOrMoveTo: function(): true { return true; }
    };
}

export default function setCollectionState(collectionsArr: CollectionResponseModel[], isMoveToMode: boolean, dependenciesObj: collectionStateCheckObject) {
    const collectionsStateObject: collectionStates = {
        base: [],
        moveFrom: [],
        hasThatPhoto: [],
        maxPhotos: [],
        addOrMoveTo: []
    };

    collectionsArr.forEach(collection => {
        collectionsStateObject['base'].push(collection);
        if(useCollectionState()['moveFrom'](collection, isMoveToMode, dependenciesObj)) { collectionsStateObject[`moveFrom`].push(collection); }
        else if(useCollectionState()['hasThatPhoto'](collection, dependenciesObj)) { collectionsStateObject['hasThatPhoto'].push(collection); }
        else if(useCollectionState()['maxPhotos'](collection, dependenciesObj)) { collectionsStateObject['maxPhotos'].push(collection); }
        else { useCollectionState()['addOrMoveTo'](); collectionsStateObject['addOrMoveTo'].push(collection); }
    });

    return collectionsStateObject;
}