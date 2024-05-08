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

    getSearchRequestURL = function(querySearchText: string, photosPerPage: number, pageNumber: number): string {
        // Due to Pixabay internal API restrictions, the lowest number of output photos is set to 3
        const pixabayMinimalPhotosOutput = (photosPerPage < 3)? 3 : photosPerPage;
        return `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API}&q=${querySearchText}&image_type=photo&page=${pageNumber}&per_page=${pixabayMinimalPhotosOutput}`;
    } 

    getSearchRequestHeaders = function(): reqHeader {
        return {};
    }
    
    getResponsePhotos = function(resData: PixabayResponseObject): PixabayPhoto[] | [] {
        return (resData?.hits?.length)? resData.hits : [];
    }

    getLowResImageURL = function(imgData: PixabayPhoto): string {
        return imgData?.previewURL || '';
    }

    getHighResImageURL = function(imgData: PixabayPhoto): string {
        return imgData?.largeImageURL || '';
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

    getMaxPageNumber = function(resData: PixabayResponseObject, photosPerPage: number): number {
        // resData.total does not seem to work on larger pages, the API is probably set around totalHits
        return Math.ceil(resData.totalHits / photosPerPage);
    }

    getProviderIntroduction = function() {
        return console.log('HELLO ! I AM PIXABAY PROVIDER');
    }
}

class PexelsPhotoProvider extends PhotoProvider {
    constructor(name: availableProviderNames) {
        super(name);
    }

    getSearchRequestURL = function(querySearchText: string, photosPerPage: number, pageNumber: number): string {
        return `https://api.pexels.com/v1/search?page=${pageNumber}&per_page=${photosPerPage}&query=${querySearchText}`;
    }

    getSearchRequestHeaders = function(): reqHeader {
        return { Authorization: import.meta.env.VITE_PEXELS_API };
    }

    getResponsePhotos = function(resData: PexelsResponseObject): PexelsPhoto[] | [] {
        return (resData?.photos?.length)? resData.photos : [];
    } 

    getLowResImageURL = function(imgData: PexelsPhoto): string {
        return imgData?.src?.small || '';
    }

    getHighResImageURL = function(imgData: PexelsPhoto): string {
        return imgData?.src?.large || '';
    }

    retrievePhotoTags = function(imgData: PexelsPhoto): string[] {
        return imgData.alt.trim().split(' ');
    }

    getPhotoAuthorImage = function(imgData: PexelsPhoto): string {
        return imgData?.src?.small || '';
    }

    getPhotoAuthorName = function(imgData: PexelsPhoto): string {
        return imgData.photographer;
    }

    getMaxPageNumber = function(resData: PexelsResponseObject, photosPerPage: number): number {
        return Math.ceil(resData.total_results / photosPerPage);
    }

    getProviderIntroduction = function() {
        return console.log('hi guys, its pexels there');
    }
}

class UnsplashPhotoProvider extends PhotoProvider {
    constructor(name: availableProviderNames) {
        super(name);
    }

    getSearchRequestURL = function(querySearchText: string, photosPerPage: number, pageNumber: number): string {
        return `https://api.unsplash.com/search/photos?query=${querySearchText}&page=${pageNumber}&per_page=${photosPerPage}&client_id=${import.meta.env.VITE_UNSPLASH_API}`;
    }

    getSearchRequestHeaders = function(): reqHeader {
        return {};
    }

    getResponsePhotos = function(resData: UnsplashResponseObject): UnsplashPhoto[] | [] {
        return (resData?.results?.length)? resData.results : [];
    } 

    getLowResImageURL = function(imgData: UnsplashPhoto): string {
        return imgData?.urls?.small || '';
    }

    getHighResImageURL = function(imgData: UnsplashPhoto): string {
        return imgData?.urls?.regular || '';
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

    getMaxPageNumber = function(resData: UnsplashResponseObject, photosPerPage: number): number {
        return resData.total_pages;
    }

    getProviderIntroduction = function() {
        return console.log(`here's unsplash provider`);
    }
}

export default PhotoProvider;