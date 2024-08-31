<script setup lang="ts">
import { useSearchQueryStore } from '@/stores/searchQueryStore';
import { usePhotoStore } from '@/stores/photosStore';
import { utilizePhotoProvider } from '~/types/type_utilities';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart, faDownload, faSave, faLink, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import handleLikePhoto from '@/composables/handleLikePhoto';

const [sqStore, pStore] = [useSearchQueryStore(), usePhotoStore()];
const { likedPhotosOrdered_get, currentUser_get } = useAuthStore();
const { currPhotoProvider } = storeToRefs(sqStore);
const { viewedPhoto } = usePhotoStore() as any;

const isPhotoLiked = ref<boolean>(false);

onBeforeMount(() => {
    console.error('ONBEFORE MOUNT TRIGGERED ! User is: ', currentUser_get());
    console.warn(' MY VIEWED IMAGE?  ', `${sqStore.currPhotoProviderName}=${pStore.viewedPhoto?.id}`);
    isPhotoLiked.value = findId(`${sqStore.currPhotoProviderName}=${pStore.viewedPhoto?.id}`, likedPhotosOrdered_get());
})

definePageMeta({
    middleware: 'handle-single-photo-id'
})

function handlePhotoLikedToggle() {
    handleLikePhoto({isPhotoLiked: isPhotoLiked.value, imgData: viewedPhoto, provider: sqStore.currPhotoProviderName }, isPhotoLiked);
}

</script>

<template>
    <NavigationBar />
    <section class="min-h-screen text-lg">
        <section>
            <div class="flex justify-center">
                <img :src="currPhotoProvider?.getHighResImageURL(utilizePhotoProvider(viewedPhoto))" loading="lazy" class="my-1 w-full object-cover object-center transition-opacity rounded-md shadow-md shadow-black" />
            </div>
            <div class="grid grid-cols-4 grid-rows-1 justify-between">
                <!-- BUTTONS FUNCTIONALITY TO BE IMPLEMENTED SOON -->
                <div class="p-3 py-5 flex flex-col justify-between align-top shadow-md shadow-red-500 rounded-[10%] border-solid border-[#333] border-2 border-t-0"
                    @click="handlePhotoLikedToggle"
                >
                    <FontAwesomeIcon :icon="faHeart" class="text-3xl text-[#333]" :class="isPhotoLiked && `text-red-500 drop-shadow-[0.15rem_0.15rem_0.25rem_#111111]`" />
                    <span class="text-center hidden">Like</span>
                </div>
                <div class="px-3 py-5 flex flex-col justify-center align-top shadow-md shadow-green-500 rounded-[10%] border-solid border-[#333] border-2 border-t-0">
                    <FontAwesomeIcon :icon="faDownload" class="text-3xl text-[#333]" />
                    <span class="text-center hidden">Download</span>
                </div>
                <div class="p-3 flex flex-col justify-center align-top shadow-md shadow-blue-500 rounded-[10%] border-solid border-[#333] border-2 border-t-0">
                    <FontAwesomeIcon :icon="faLink" class="text-3xl text-[#333]" />
                    <span class="text-center hidden">Website</span>
                </div>
                <div class="p-3 flex flex-col justify-center align-top shadow-md shadow-yellow-500 rounded-[10%] border-solid border-[#333] border-2 border-t-0">
                    <FontAwesomeIcon :icon="faSave" class="text-3xl text-[#333]" />
                    <span class="text-center hidden">Add</span>
                </div>
            </div>
        </section>
        <section class="mx-6 mt-12 mb-16">
            <h2 class="min-w-[70vw] text-center mt-4 mb-8 -ml-6 py-3 px-6 text-3xl font-bold bg-[#eee] inline-block rounded-r-2xl"> Details </h2>
            <p> <span class="text-base font-bold my-3 mr-2">Image ID:</span>  {{ currPhotoProvider?.getPhotoId(utilizePhotoProvider(viewedPhoto)) }}</p>
            <p> <span class="text-base font-bold my-3 mr-2">Photo resolution:</span> {{ currPhotoProvider?.getPhotoResolution(utilizePhotoProvider(viewedPhoto)) }}</p>
            <p> <span class="text-base font-bold my-3 mr-2">Description:</span> {{ currPhotoProvider?.getPhotoDescription(utilizePhotoProvider(viewedPhoto)) }}</p>
        </section>

        <section class="mx-6 mt-12 mb-16">
            <div class="grid grid-rows-1 grid-cols-[1fr_auto_1fr] items-center">
                <div class="bg-black h-[0.15rem] mr-3 shadow-xl shadow-black"></div>
                <a :href="currPhotoProvider?.getPhotoAuthorImage(utilizePhotoProvider(viewedPhoto))" target="_blank"> <img class="w-24 h-24 mx-3 rounded-full text-xs border-2 shadow-md shadow-black" :src="currPhotoProvider?.getPhotoAuthorImage(utilizePhotoProvider(viewedPhoto))" alt="Author profile picture" /> </a>
                <div class="bg-black h-[0.15rem] ml-3 shadow-xl shadow-black"></div>
            </div>
            <p class="mt-4 mb-6 inline-block text-3xl font-bold text-center w-full"> <a :href="currPhotoProvider?.getAuthorProfileURL(utilizePhotoProvider(viewedPhoto))" target="_blank"> {{ currPhotoProvider?.getPhotoAuthorName(utilizePhotoProvider(viewedPhoto)) }} </a> </p>
            <p class="mb-3"> <span class="text-base my-3 mr-2">If you enjoyed this photo, consider checking out the author page for more photos just like that!  </span></p>
            <p class="mt-3 text-center"> <span class="text-base font-bold my-3 mr-2">Author ID:</span>  #{{ currPhotoProvider?.getAuthorID(utilizePhotoProvider(viewedPhoto)) }} </p>
            <div class="bg-black h-[0.11rem] my-12 shadow-xl shadow-black"></div>
        </section> 
        
        <section class="mx-6 mt-12 mb-16">
            <div class="flex flex-col items-end">
                <h2 class="w-fit min-w-[70vw] text-center mt-4 mb-8 -mr-6 ml-0 py-3 px-6 text-3xl font-bold bg-[#eee] rounded-l-2xl justify-self-end"> Attribution </h2>
            </div>
            <p class="mb-3"> <span class="text-base font-bold my-3 mr-2">Photo provider: </span>  {{ currPhotoProvider?.name?.charAt(0)?.toUpperCase().concat(currPhotoProvider?.name?.slice(1)) }}</p>
            <p class="mb-3"><span class="text-base my-3 mr-2">This photo is available thanks to out provider, {{ currPhotoProvider?.name?.charAt(0)?.toUpperCase().concat(currPhotoProvider?.name?.slice(1)) }}. You can also view the photo on the provider website </span> <a :href="currPhotoProvider?.getProviderWebsite()" target="_blank" class="-mx-1 underline font-medium italic text-base"> <FontAwesomeIcon :icon="faUpRightFromSquare" /> accessible  here </a>  </p>
            
            <p class="mt-9 mb-3"> <span class="text-base font-bold my-3 mr-2">Photo author: </span>  {{ currPhotoProvider?.getPhotoAuthorName(utilizePhotoProvider(viewedPhoto)) }}</p>
            <p class="mb-3"><span class="text-base my-3 mr-2">Support the creator by visiting his profile on the Provider website. Also you can check out the original image source </span> <a :href="currPhotoProvider?.getPhotoOriginalSource(utilizePhotoProvider(viewedPhoto))" target="_blank" class="-mx-1 underline font-medium italic text-base"> <FontAwesomeIcon :icon="faUpRightFromSquare" /> available  here </a>  </p>

        </section>
    </section>
    <ActionPanel />
</template>


<style scoped>

</style>
