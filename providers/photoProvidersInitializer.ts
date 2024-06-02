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

    getPhotoId = function(imgData: PixabayPhoto): number {
        return imgData.id;
    }

    getSinglePhotoById = function(photoId: string): string {
        // This hook will be useful only when player request the image inside app by just a link (no in-app interactions beforehand)
        return `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API}&id=${photoId}`;
    }

    getPhotoResolution = function(imgData: PixabayPhoto): string {
        return `${imgData.imageWidth} x  ${imgData.imageHeight}`;
    }

    getPhotoDescription = function(imgData: PixabayPhoto): string {
        return imgData.tags.charAt(0).toUpperCase() + imgData.tags.slice(1);
    }

    getAuthorID = function(imgData: PixabayPhoto): number {
        return imgData.user_id;
    }

    getAuthorProfileURL = function(imgData: PixabayPhoto): string {
        // Pixabay unfortunately does not provide an API to the user profile, so instead we do provide a profile image overview
        return imgData.userImageURL;
    }

    getPhotoOriginalSource = function(imgData: PixabayPhoto): string {
        return imgData.webformatURL;
    }

    getProviderWebsite = function(): string {
        return 'https://pixabay.com/';
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

    getPhotoId = function(imgData: PexelsPhoto): number {
        return imgData.id;
    }

    getSinglePhotoById = function(photoId: string): string {
        // This hook will be useful only when player request the image inside app by just a link (no in-app interactions beforehand)
        return `https://api.pexels.com/v1/photos/${photoId}`;
    }

    getPhotoResolution = function(imgData: PexelsPhoto): string {
        return `${imgData.width} x  ${imgData.height}`;
    }

    getPhotoDescription = function(imgData: PexelsPhoto): string {
        return imgData.alt;
    }

    getAuthorID = function(imgData: PexelsPhoto): number {
        return imgData.photographer_id;
    }

    getAuthorProfileURL = function(imgData: PexelsPhoto): string {
        return imgData.photographer_url;
    }

    getPhotoOriginalSource = function(imgData: PexelsPhoto): string {
        return imgData.src?.large || '';
    }

    getProviderWebsite = function(): string {
        return 'https://www.pexels.com/';
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

    getPhotoId = function(imgData: UnsplashPhoto): string {
        return imgData.id;
    }

    getSinglePhotoById = function(photoId: string): string {
        // This hook will be useful only when player request the image inside app by just a link (no in-app interactions beforehand)
        return  `https://api.unsplash.com/photos/${photoId}?client_id=${import.meta.env.VITE_UNSPLASH_API}`;
    }

    getPhotoResolution = function(imgData: UnsplashPhoto): string {
        return `${imgData.width} x  ${imgData.height}`;
    }

    getPhotoDescription = function(imgData: UnsplashPhoto): string {
        return imgData.description? imgData.alt_description : `*Not provided*`;
    }

    getAuthorID = function(imgData: UnsplashPhoto): string {
        return imgData.user.id;
    }

    getAuthorProfileURL = function(imgData: UnsplashPhoto): string {
        return imgData.user.links.html;
    }

    getPhotoOriginalSource = function(imgData: UnsplashPhoto): string {
        return imgData.urls?.full || '';
    }

    getProviderWebsite = function(): string {
        return 'https://unsplash.com/';
    }

    getProviderIntroduction = function() {
        return console.log(`here's unsplash provider`);
    }
}

export default PhotoProvider;