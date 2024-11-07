import type { availablePhotoTypes, requestDependenciesObject, requestOptionsObject } from "~/types/type_utilities";

export default async function searchPhotosByQuery(rdObject: requestDependenciesObject,  roObject: requestOptionsObject ): Promise<availablePhotoTypes[] | null> {
    if(rdObject.currPhotoProvider === undefined || !rdObject.currPhotoProvider) return null; // This line silences error where TS complies that x (Provider Name) can be possibly undefined
    if(roObject.isRequestPending === false) { return null; }

    const requestData = await fetch(rdObject.currPhotoProvider.getSearchRequestURL(rdObject.queryText, rdObject.outputPhotosNumber, rdObject.searchPageCount + roObject.pageModifier), {headers: rdObject.currPhotoProvider.getSearchRequestHeaders()})
        .then(res => res? res.json() : '')
        .then(data => data)
        .catch(err => { roObject.isRequestPending = false })

    const result = rdObject.currPhotoProvider.getResponsePhotos(requestData);

    return result? result : [];
}