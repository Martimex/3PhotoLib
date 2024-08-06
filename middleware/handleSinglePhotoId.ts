import PhotoProvider from "~/providers/photoProvidersInitializer";
import { availableProviderNames_Array, utilizePhotoProvider } from "~/types/type_utilities";
import type { availablePhotoTypes, availableProviderNames } from "~/types/type_utilities";

export default defineNuxtRouteMiddleware(async(to, from) => {

    const pStore = usePhotoStore();
    const sqStore= useSearchQueryStore();

    if(pStore['viewedPhoto']) return;
    
    // User visits a page from URL (not from UI). Try retrieve the photo ID and the provider name from the supplied URL

    if(availableProviderNames_Array.find(entry => entry === `${to.params.provider}`)) {
        const [providerName, photoID] = [to.params.provider as availableProviderNames, to.params.id as string];
        const photoToView = new PhotoProvider(providerName).setCurrentProvider();
        if(photoToView) {
            const singlePhotoData: any = await $fetch(`${photoToView.getSinglePhotoById(photoID)}`, {headers: photoToView.getSearchRequestHeaders()})
                    .then(res => photoToView.getSinglePhoto(utilizePhotoProvider(res as availablePhotoTypes )))
                    .catch(err => throwError(404, 'PROVIDED PHOTO ID IS INCORRECT'));
            if(singlePhotoData) {
                sqStore['currPhotoProviderName'] = providerName;
                sqStore['currPhotoProvider'] = new PhotoProvider(providerName).setCurrentProvider();
                pStore['viewedPhoto'] = singlePhotoData;
            }
            else { throwError(404, 'Photo not found') }
        }
    } else {
        throwError(404, 'PROVIDER NAME IS INCORRECT');
    }


    function throwError(errorNo: number, info?: string) {
        throw createError({
            statusCode: errorNo,
            statusMessage: info    
        });
    }

});
