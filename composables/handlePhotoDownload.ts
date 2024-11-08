import type { availableProviderNames, availablePhotoTypes } from "~/types/type_utilities";
import PhotoProvider from '@/providers/photoProvidersInitializer';
import { utilizePhotoProvider } from '~/types/type_utilities';


export default async function handlePhotoDownload(anchorEl: HTMLAnchorElement | undefined, providerName: availableProviderNames, imgData: availablePhotoTypes): Promise<boolean> {

    const providerObj = new PhotoProvider(providerName).setCurrentProvider();

    if(!providerObj || !anchorEl) throw new Error('Failed to download the image. Please try again later');
    const res = await fetch(providerObj.getHighResImageURL(utilizePhotoProvider(imgData)))
    const blob = await res.blob();
    const href = URL.createObjectURL(blob);
    anchorEl.href = href;
    anchorEl.click();
    window.URL.revokeObjectURL(href);
    // Trigger UI update for Photo Panel
    return true;
}