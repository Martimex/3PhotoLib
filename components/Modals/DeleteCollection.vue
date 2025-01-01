<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFont } from '@fortawesome/free-solid-svg-icons';
import type CollectionResponseModel from '~/types/responseModel_collection';
import type { registrationFormProp } from '~/types/type_utilities';
import { keyToValidator } from '~/validators/formValidators';

const { currentUser_get } = useAuthStore();
const { asyncProcess_get, asyncProcess_set } = useStatusStore();

const props = defineProps<{
    collectionData: CollectionResponseModel
}>();

const modalEmits = defineEmits(['modalClose', 'confirmDelete']);

const tStore = useTemporalStore();

const collectionPhotosCount = ref<number>(props.collectionData.collectionPhotos.length);

const deleteCollectionForm: {[key: string]: registrationFormProp}  = {
    confirmationText: {text: ref<string>(tStore.inputsText.deleteCollection.phrase), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: ref()},
};

const setCollectionLengthText = computed(() => {
    if(collectionPhotosCount.value > 0) return `? This collection already includes ${collectionPhotosCount.value} photos.`;
    return `? This collection does not contain any photos.`;
})

function handleErrorTracing(isErrorPresent: boolean, key: string, errorMsg?: string): void {
    if(isErrorPresent) {
        deleteCollectionForm[key].inputElement?.value.classList.add('border-b-red-500');
        if(deleteCollectionForm[key].errorMsgElement) {
            deleteCollectionForm[key].errorMsgElement.value.classList.remove('hidden');
            deleteCollectionForm[key].errorMsgElement.value.textContent = errorMsg;
        } 
    } else {
        deleteCollectionForm[key].inputElement?.value.classList.remove('border-b-red-500');
        if(deleteCollectionForm[key].errorMsgElement) {
            deleteCollectionForm[key].errorMsgElement.value.classList.add('hidden');
            deleteCollectionForm[key].errorMsgElement.value.textContent = '';
        }
    }
}

function validateFieldText() {
    if(collectionPhotosCount.value === 0) { handleDeleteCollection(); }
    else {
        let validationsPassed = 0;

        Object.keys(deleteCollectionForm).forEach((key: string) => { 
            const validation = keyToValidator[key].safeParse(deleteCollectionForm[key].text.value);
            const validationResult = validation.success;
            if(validationResult) { 
                validationsPassed += 1; 
                // Remove any error traces from the UI
                handleErrorTracing(false, key);
            }
            else {
                // Validation did not pass for this field.
                handleErrorTracing(true, key, validation.error.issues[0].message);
            }
        });

        if(validationsPassed === Object.keys(deleteCollectionForm).length) { handleDeleteCollection(); }
    }
}

async function handleDeleteCollection() {
    // Perform DB call to delete the collection and later perform UI update
    if(asyncProcess_get()) { return; } 
    asyncProcess_set(true);

    const currentUserData = currentUser_get();
    if(!currentUserData) { throw new Error('ERROR: User data not found !'); }

    await $fetch(`/collection/delete`, { method: 'post', body: {
        userData: currentUserData,
        collectionID: props.collectionData.releaseId
    }});

    // Set LOCAL update for new collection
    modalEmits('confirmDelete', props.collectionData);

    // Collection deleted! Now close the modal
    modalEmits('modalClose');

    asyncProcess_set(false);
}

</script>

<template>
    <div class="h-screen w-full bg-[#222b] fixed top-0 left-0 z-10 backdrop-blur flex items-center justify-center overflow-auto" @click.self="!asyncProcess_get() && modalEmits('modalClose')">
        <section class="bg-[#eee] m-auto w-full h-fit px-3 py-6 rounded-md shadow-[0.3rem_0.3rem_0.5rem_#222] border-2 border-[#222] border-solid
            sm:max-w-[550px]
            lg:max-w-[660px]
        ">
            <h2 class="max-w-[80%] align-middle mx-auto text-4xl font-bold text-center py-6 mb-9 border-[#222] border-solid border-b-4"> Delete Collection </h2>
            <div class="mx-3">
                <p class="text-base"> Do you want to remove collection: <b> {{  props.collectionData.name }}</b>{{ setCollectionLengthText }} </p>
                <p v-if="collectionPhotosCount > 0" class="text-base mt-6 font-light"> To proceed, type word "DELETE" in the field below, and then press the confirm button.  </p>
                <p v-else class="text-base font-bold my-4"> NOTE: This action cannot be undone. </p>
            </div>

            <form v-if="collectionPhotosCount > 0"  id="col-delete" name="col-delete" method="post" @submit.prevent="validateFieldText"
                class="mx-2 mt-6"
            >
                <div class="mt-3 mb-6">
                    <div :ref="deleteCollectionForm.confirmationText.inputElement" class="flex my-3 w-full outline-gray-500 bg-neutral-100 rounded-md shadow-[0.1rem_0.1rem_0.5rem_black] border-y-4 box-border">
                        <FontAwesomeIcon :icon="faFont" class="text-4xl text-[#222a] drop-icon mx-3 my-auto px-1 drop-shadow-[0rem_0rem_0.20rem_#222d]" ></FontAwesomeIcon>
                        <div class="relative w-full">
                            <input type="text" aria-label="Add a collection name" id="cname" name="cname" value="" v-model="deleteCollectionForm.confirmationText.text.value" placeholder="Confirmation phrase..."
                            class="text-black text-base font-semibold text-center w-full py-4 px-2 outline-[#222c] bg-neutral-100 appearance-none cursor-pointer rounded-lg rounded-l-none border-l-2  border-[#222c] border-dashed" 
                            />
                            <span :ref="deleteCollectionForm.confirmationText.errorMsgElement" class="absolute bottom-0 left-0 text-red-500 font-bold text-xs w-full inline-block text-center" :class="deleteCollectionForm.confirmationText.isTextCorrect.value? 'hidden' : 'inline-block'"> Error: Some error occured </span>
                        </div>
                    </div>
                </div>

                <p class="text-sm font-bold my-4"> NOTE: This action cannot be undone. </p>
            </form>
            
            <div class="grid grid-cols-2 grid-rows-1 pt-9">
                <button type="reset" @click.self="!asyncProcess_get() && modalEmits('modalClose')" class="font-normal text-lg border-2 border-black rounded-md py-4"> Cancel </button>
                <button type="submit" @click.self="!asyncProcess_get() && validateFieldText()" class="font-bold text-lg border-2 border-black bg-[#222d] text-neutral-100 rounded-md py-4"> Confirm </button>
            </div>
        </section>
    </div>
</template>

<style scoped>

</style>