// This file contains every necessary
import type PixabayPhoto from "@/types/photoItem_pixabay";
import type PexelsPhoto from "@/types/photoItem_pexels";
import type UnsplashPhoto from "@/types/photoItem_unsplash";
import type PixabayResponseObject from "@/types/responseObject_pixabay";
import type PexelsResponseObject from "@/types/responseObject_pexels";
import type UnsplashResponseObject from "@/types/responseObject_unsplash";
import type { availableProviderNames } from "@/types/type_utilities";

type allowedProviders = PixabayPhotoProvider | PexelsPhotoProvider | UnsplashPhotoProvider;
type reqHeader = { Authorization: string } | {};

class PhotoProvider {
    name: availableProviderNames;
    constructor(name: availableProviderNames) {
        this.name = name;
    }

    setCurrentProvider = function(this: any): allowedProviders | undefined {
        let providerName;
        if (this.name === 'pixabay') providerName = new PixabayPhotoProvider(this.name);
        else if (this.name === 'pexels') providerName = new PexelsPhotoProvider(this.name);
        else if (this.name === 'unsplash') providerName = new UnsplashPhotoProvider(this.name);

        return providerName;
    }

    getPhotoProviderName = function(name: string) {
        return name;
    }
}

class PixabayPhotoProvider extends PhotoProvider {
    constructor(name: availableProviderNames) {
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
    constructor(name: availableProviderNames) {
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

class UnsplashPhotoProvider extends PhotoProvider {
    constructor(name: availableProviderNames) {
        super(name);
    }

    getSearchRequestURL = function(querySearchText: string): string {
        return `https://api.unsplash.com/search/photos?query=${querySearchText}&page=1&per_page=10&client_id=${import.meta.env.VITE_UNSPLASH_API}`;
    }

    getSearchRequestHeaders = function(): reqHeader {
        return {};
    }

    getResponsePhotos = function(resData: UnsplashResponseObject): UnsplashPhoto[] | [] {
        return (resData.results.length)? resData.results : [];
    } 

    getLowResImageURL = function(imgData: UnsplashPhoto): string {
        console.log(imgData);
        return imgData.urls.small;
    }

    getHighResImageURL = function(imgData: UnsplashPhoto): string {
        return imgData.urls.regular;
    }

    retrievePhotoTags = function(imgData: UnsplashPhoto): string[] {
        return imgData.tags.map(tag => tag.title);
    }

    getPhotoAuthorImage = function(imgData: UnsplashPhoto): string {
        return imgData.user.profile_image.medium;
    }

    getPhotoAuthorName = function(imgData: UnsplashPhoto): string {
        return imgData.user.name;
    }

    getProviderIntroduction = function() {
        return console.log(`here's unsplash provider`);
    }
}

export default PhotoProvider;