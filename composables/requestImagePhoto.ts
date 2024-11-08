import type { availableProviderNames, availablePhotoTypes } from "~/types/type_utilities";
import { utilizePhotoProvider } from '~/types/type_utilities';
import PhotoProvider from '@/providers/photoProvidersInitializer';


export default async function requestImagePhoto(ev: Event, providerName: availableProviderNames, photoID: string) {
    // Pixabay is probably constantly changing IMG URL's, in which case the specific photo URL has to be reassigned with photo ID search,
    // and also appropiate DB data needs to be updated.
    const targetElement = ev.target as HTMLImageElement;
    const providerObj = new PhotoProvider(providerName).setCurrentProvider()

    const requestedPhoto =  providerObj?.getSinglePhotoById(utilizePhotoProvider(photoID as any));
    const data = await $fetch(`${requestedPhoto}`, { headers: providerObj?.getSearchRequestHeaders() })
        .then(res => providerObj?.getSinglePhoto(utilizePhotoProvider(res as availablePhotoTypes )));

    if(!data) { throw new Error('The photo data fetch has failed'); }

    if(providerObj) {
        targetElement.src = providerObj?.getHighResImageURL(utilizePhotoProvider(data))
    }

    // Last of all lets update the photoDetails object (database photo record)
    await $fetch(`/photo/updateData`, { method: 'post', body: {
        photoData: data,
        photoID: `${providerName}=${data.id}`
    }});
}