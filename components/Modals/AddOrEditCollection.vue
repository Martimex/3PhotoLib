<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import type { registrationFormProp } from '@/types/type_utilities';

const tStore = useTemporalStore();

const availableCollectionFolderColors = ref<string[]>(['bg-[#fbf8cc]', 'bg-[#fde4cf]', 'bg-[#ffcfd2]', 'bg-[#f1c0e8]', 'bg-[#cfbaf0]', 'bg-[#a3c4f3]', 'bg-[#90dbf4]', 'bg-[#8eecf5]', 'bg-[#98f5e1]', 'bg-[#b9fbc0]']); // 10 colors total

const props = defineProps<{
    isEditMode: boolean,
}>();

const addCollectionForm: {[key: string]: registrationFormProp}  = {
        name: {text: ref<string>(tStore.inputsText.addCollection.name), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: ref()},
        description: {text: ref<string>(tStore.inputsText.addCollection.description), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: ref()}
    };

const modalEmits = defineEmits(['modalClose']);

const checkActionMode = (): string => {  return props.isEditMode? 'edit' : 'add'; }

const handleAddNewCollection = function() {
    console.warn('HANDLING .... ')
}

</script>

<template>
    <div class="h-screen w-full bg-[#222b] fixed top-0 left-0 z-20 backdrop-blur flex items-center justify-center overflow-auto" @click.self="modalEmits('modalClose')">
        <section class="bg-[#eee] m-auto w-full h-fit px-3 py-6 rounded-md shadow-[0.3rem_0.3rem_0.5rem_#222] border-2 border-[#222] border-solid">
            <form :id="checkActionMode()" :name="checkActionMode()" :method="$props.isEditMode? 'put' : 'post'" @submit.prevent="handleAddNewCollection"
                class="mx-2"
            >
                <h2 class="max-w-[80%] align-middle mx-auto text-4xl font-bold text-center py-6 mb-9 border-[#222] border-solid border-b-4"> New collection </h2>

                <p class="text-lg font-semibold ml-3"> Name your folder </p>

                <div class="mt-3 mb-6">
                    <div :ref="addCollectionForm.name.inputElement" class="flex my-3 w-full outline-gray-500 bg-neutral-100 rounded-md shadow-[0.1rem_0.1rem_0.5rem_black] border-y-4 box-border">
                        <FontAwesomeIcon :icon="faFolder" class="text-5xl text-[#222d] drop-icon mx-3 my-auto px-1"></FontAwesomeIcon>
                        <div class="relative w-full">
                            <input type="text" aria-label="Add a collection name" id="cname" name="cname" value="" v-model="addCollectionForm.name.text.value" placeholder="Colleciton name..."
                            class="text-black text-lg font-semibold text-center w-full py-5 px-2 outline-[#222c] bg-neutral-100 appearance-none cursor-pointer rounded-lg rounded-l-none border-l-2  border-[#222c] border-dashed" 
                            />
                            <span :ref="addCollectionForm.name.errorMsgElement" class="absolute bottom-0 left-0 text-red-500 font-bold text-xs w-full inline-block text-center" :class="addCollectionForm.name.isTextCorrect.value? 'hidden' : 'inline-block'"> Error: Some error occured </span>
                        </div>
                    </div>
                </div>

                <p class="text-lg font-semibold ml-3"> Short description </p>
                <textarea maxlength="100" rows="5" placeholder="Describe the content or theme of the collection..." class="mt-3 mb-6 w-full p-4 bg-neutral-100 rounded-md shadow-[0.1rem_0.1rem_0.5rem_black]" v-model="addCollectionForm.description.text.value"> </textarea>
                
                <p class="text-lg font-semibold ml-3"> Pick a folder color </p>
                <div class="mt-3 mb-6 flex gap-3 flex-wrap">
                    <div v-for="(color, index) in availableCollectionFolderColors" :key="color + index">
                        <ColorPreviewBox :color="color" />
                    </div>
                </div>

                <div class="grid grid-cols-2 grid-rows-1 pt-9">
                    <button @click.self="modalEmits('modalClose')" class="font-normal text-lg border-2 border-black rounded-md py-4"> Cancel </button>
                    <button type="submit" class="font-bold text-lg border-2 border-black bg-[#222d] text-neutral-100 rounded-md py-4"> Create </button>
                </div>

            </form>

        </section>
    </div>
</template>

<style scoped>

</style>