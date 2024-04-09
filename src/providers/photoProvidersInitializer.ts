// This file contains every necessary
import type PixabayPhoto from "@/types/photoItem_pixabay";
import type PexelsPhoto from "@/types/photoItem_pexels";
import type PixabayResponseObject from "@/types/responseObject_pixabay";
import type PexelsResponseObject from "@/types/responseObject_pexels";

type allowedProviders = PixabayPhotoProvider | PexelsPhotoProvider;
type allowedProviderNames = 'pixabay' | 'pexels';
type reqHeader = { Authorization: string } | {};

class PhotoProvider {
    name: allowedProviderNames;
    constructor(name: allowedProviderNames) {
        this.name = name;
    }

    setCurrentProvider = function(this: any): allowedProviders | undefined {
        let providerName;
        if (this.name === 'pixabay') providerName = new PixabayPhotoProvider(this.name);
        else if (this.name === 'pexels') providerName = new PexelsPhotoProvider(this.name);

        return providerName;
    }

    getPhotoProviderName = function(name: string) {
        return name;
    }
}

class PixabayPhotoProvider extends PhotoProvider {
    constructor(name: allowedProviderNames) {
        super(name);
    }

    getSearchRequestURL = function(querySearchText: string): string {
        return `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API}&q=${querySearchText}&image_type=photo&page=1&per_page=15`;
    } 

    getSearchRequestHeaders = function(): reqHeader {
        return {};
    }
    
    getResponsePhotos = function(resData: PixabayResponseObject): PixabayPhoto[] | [] {
        return (resData.hits.length)? resData.hits : [];
    }

    getLowResImageURL = function(imgData: PixabayPhoto): string {
        return imgData.previewURL;
    }

    getHighResImageURL = function(imgData: PixabayPhoto): string {
        return imgData.largeImageURL;
    }

    retrievePhotoTags = function(imgData: PixabayPhoto): string[] {
        return imgData.tags.split(',');
    }

    getPhotoAuthorImage = function(imgData: PixabayPhoto): string {
        return imgData.userImageURL;
    }

    getPhotoAuthorName = function(imgData: PixabayPhoto): string {
        return imgData.user;
    }

    getProviderIntroduction = function() {
        return console.log('HELLO ! I AM PIXABAY PROVIDER');
    }
}

class PexelsPhotoProvider extends PhotoProvider {
    constructor(name: allowedProviderNames) {
        super(name);
    }

    getSearchRequestURL = function(querySearchText: string): string {
        return `https://api.pexels.com/v1/search?page=1&per_page=15&query=${querySearchText}`;
    }

    getSearchRequestHeaders = function(): reqHeader {
        return { Authorization: import.meta.env.VITE_PEXELS_API };
    }

    getResponsePhotos = function(resData: PexelsResponseObject): PexelsPhoto[] | [] {
        return (resData.photos.length)? resData.photos : [];
    } 

    getLowResImageURL = function(imgData: PexelsPhoto): string {
        return imgData.src.small;
    }

    getHighResImageURL = function(imgData: PexelsPhoto): string {
        return imgData.src.large;
    }

    retrievePhotoTags = function(imgData: PexelsPhoto): string[] {
        return imgData.alt.trim().split(' ');
    }

    getPhotoAuthorImage = function(imgData: PexelsPhoto): string {
        return imgData.src.small;
    }

    getPhotoAuthorName = function(imgData: PexelsPhoto): string {
        return imgData.photographer;
    }

    getProviderIntroduction = function() {
        return console.log('hi guys, its pexels there');
    }
}

export default PhotoProvider;