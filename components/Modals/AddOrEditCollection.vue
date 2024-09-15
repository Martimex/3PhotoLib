<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { availableFolderColors } from '~/utils/getAvailableFolderClassNames'; /* DO NOT REMOVE THIS IMPORT */
import type { registrationFormProp } from '@/types/type_utilities';
import { keyToValidator } from '~/validators/formValidators';

const tStore = useTemporalStore();
const { currentUser_get } = useAuthStore();
const { viewedCollection_get } = useCollectionStore();

onMounted(() => { /* console.log(pickedFolderColor)  */})

const availableCollectionFolderColors = ref<string[]>(['#fffd', '#777b', '#fbf8cc', '#fde4cf', '#ffcfd2', '#f1c0e8', '#cfbaf0', '#a3c4f3', '#90dbf4', '#8eecf5', '#98f5e1', '#b9fbc0']); // 12 colors total

const props = defineProps<{
    isEditMode: boolean,
}>();

const pickedFolderColor = ref<null | string>(props.isEditMode? viewedCollection_get()?.folderColor as string : '#fffd');

const addCollectionForm: {[key: string]: registrationFormProp}  = {
        collectionName: {text: ref<string>(props.isEditMode? viewedCollection_get()?.name : tStore.inputsText.addCollection.name), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: ref()},
        description: {text: ref<string>(props.isEditMode? viewedCollection_get()?.description : tStore.inputsText.addCollection.description), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: ref()},
    };

const modalEmits = defineEmits(['modalClose', 'add', 'edit']);

const checkActionMode = (): string => {  return props.isEditMode? 'edit' : 'add'; }

const isFolderColor = computed(() => { return pickedFolderColor.value? `text-[${pickedFolderColor.value}]` : `text-[#fffd]` });

function handleColorPick(newValue: string) {
    pickedFolderColor.value = newValue;
}

function handleErrorTracing(isErrorPresent: boolean, key: string, errorMsg?: string): void {
    if(isErrorPresent) {
        addCollectionForm[key].inputElement?.value.classList.add('border-b-red-500');
        if(addCollectionForm[key].errorMsgElement) {
            addCollectionForm[key].errorMsgElement.value.classList.remove('hidden');
            addCollectionForm[key].errorMsgElement.value.textContent = errorMsg;
        } 
    } else {
        addCollectionForm[key].inputElement?.value.classList.remove('border-b-red-500');
        if(addCollectionForm[key].errorMsgElement) {
            addCollectionForm[key].errorMsgElement.value.classList.add('hidden');
            addCollectionForm[key].errorMsgElement.value.textContent = '';
        }
    }
}

const validateCollectionData = function() {
    let validationsPassed = 0;

    Object.keys(addCollectionForm).forEach((key: string) => { 
        const validation = keyToValidator[key].safeParse(addCollectionForm[key].text.value);
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

    if(validationsPassed === Object.keys(addCollectionForm).length) {
        props.isEditMode? handleEditNewCollection() : handleAddNewCollection();
    }
}

const handleEditNewCollection = async function() {
    console.warn('UPDATEING ;;; ')

    const [currentUserData, currentCollectionData] = [currentUser_get(), viewedCollection_get() ];

    if(!currentUserData || !currentCollectionData) { throw new Error('ERROR: USER OR COLLECTION DATA NOT FOUND !')}

    console.warn('userData', currentUserData);

    // API CALL
    const updatedCollection = await $fetch('/collection/edit', { method: 'post', body: {
        name: addCollectionForm.collectionName.text.value,
        description: addCollectionForm.description.text.value,
        folderColor: pickedFolderColor.value,
        releaseId: currentCollectionData.releaseId,
        currentUser: currentUserData
    }});

    // Set LOCAL update for new collection
    modalEmits('edit', updatedCollection);

    // Collection created! Now close the modal
    modalEmits('modalClose');
}

const handleAddNewCollection = async function() {

    const currentUserData = currentUser_get();

    if(!currentUserData) { throw new Error('ERROR: User data not found !')}

    const newCollection = await $fetch(`/collection/add`, { method: 'post', body: {
        name: addCollectionForm.collectionName.text.value,
        description: addCollectionForm.description.text.value,
        folderColor: pickedFolderColor.value,
        currentUser: currentUserData
    }});

    // Set LOCAL update for new collection
    modalEmits('add', newCollection);

    // Collection created! Now close the modal
    modalEmits('modalClose');

}

</script>

<template>
    <div class="h-screen w-full bg-[#222b] fixed top-0 left-0 z-20 backdrop-blur flex items-center justify-center overflow-auto" @click.self="modalEmits('modalClose')">
        <section class="bg-[#eee] m-auto w-full h-fit px-3 py-6 rounded-md shadow-[0.3rem_0.3rem_0.5rem_#222] border-2 border-[#222] border-solid">
            <form :id="checkActionMode()" :name="checkActionMode()" :method="$props.isEditMode? 'put' : 'post'" @submit.prevent="validateCollectionData"
                class="mx-2"
            >
                <h2 class="max-w-[80%] align-middle mx-auto text-4xl font-bold text-center py-6 mb-9 border-[#222] border-solid border-b-4"> {{ props.isEditMode? `Edit collection` : `New collection` }} </h2>

                <p class="text-lg font-semibold ml-3"> Name your folder </p>

                <div class="mt-3 mb-6">
                    <div :ref="addCollectionForm.collectionName.inputElement" class="flex my-3 w-full outline-gray-500 bg-neutral-100 rounded-md shadow-[0.1rem_0.1rem_0.5rem_black] border-y-4 box-border">
                        <FontAwesomeIcon :icon="faFolder" class="text-5xl drop-icon mx-3 my-auto px-1 drop-shadow-[0rem_0rem_0.20rem_#222d]" :class="isFolderColor" ></FontAwesomeIcon>
                        <div class="relative w-full">
                            <input type="text" aria-label="Add a collection name" id="cname" name="cname" value="" v-model="addCollectionForm.collectionName.text.value" placeholder="Colleciton name..."
                            class="text-black text-lg font-semibold text-center w-full py-5 px-2 outline-[#222c] bg-neutral-100 appearance-none cursor-pointer rounded-lg rounded-l-none border-l-2  border-[#222c] border-dashed" 
                            />
                            <span :ref="addCollectionForm.collectionName.errorMsgElement" class="absolute bottom-0 left-0 text-red-500 font-bold text-xs w-full inline-block text-center" :class="addCollectionForm.collectionName.isTextCorrect.value? 'hidden' : 'inline-block'"> Error: Some error occured </span>
                        </div>
                    </div>
                </div>

                <p class="text-lg font-semibold ml-3"> Short description </p>
                
                <div class="relative mt-3 mb-6">
                    <textarea :ref="addCollectionForm.description.inputElement" maxlength="90" rows="5" placeholder="Describe the content or theme of the collection..." class="w-full p-4 bg-neutral-100 rounded-md -mb-2 border-b-4 shadow-[0.1rem_0.1rem_0.5rem_black]" v-model="addCollectionForm.description.text.value"> </textarea>
                    <span :ref="addCollectionForm.description.errorMsgElement" class="absolute bottom-0 left-0 text-red-500 font-bold text-xs w-full inline-block text-center" :class="addCollectionForm.description.isTextCorrect.value? 'hidden' : 'inline-block'"> Error: Some error occured </span>
                </div>

                <p class="text-lg font-semibold ml-3"> Pick a folder color </p>
                <div class="mt-3 mb-6 flex gap-3 flex-wrap relative">
                    <div v-for="(color, index) in availableCollectionFolderColors" :key="color + index">
                        <ColorPreviewBox :color="color" :currentFolderColor="pickedFolderColor" @colorPick="handleColorPick" />
                    </div>
                </div>

                <div class="grid grid-cols-2 grid-rows-1 pt-9">
                    <button type="reset" @click.self="modalEmits('modalClose')" class="font-normal text-lg border-2 border-black rounded-md py-4"> Cancel </button>
                    <button type="submit" class="font-bold text-lg border-2 border-black bg-[#222d] text-neutral-100 rounded-md py-4"> {{ props.isEditMode? 'Update' : 'Create'}} </button>
                </div>

            </form>

        </section>
    </div>
</template>

<style scoped>

</style>