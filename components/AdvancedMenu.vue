<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useSearchQueryStore } from '../stores/searchQueryStore';
    import type { availableProviderNames, numberInputKeys } from '@/types/type_utilities';
    import PhotoProvider from '@/providers/photoProvidersInitializer';
import { storeToRefs } from 'pinia';

    const allowedKeyboardCharacters = ['backspace', 'delete', 'arrowup', 'arrowright', 'arrowleft', 'arrowdown'];
    const currentInput = ref<HTMLInputElement | null>(null);
    const [outputPhotosInput, pageNumberInput] = [ref<HTMLInputElement | null>(null), ref<HTMLInputElement | null>(null)];
    const sqStore = useSearchQueryStore();
    const { outputPhotosObj, searchPageObj, outputPhotosNumber, searchPageCount } = storeToRefs(sqStore);
    //const [outputPhotosObj.value, searchPageObj] = [sqStore.outputPhotosObj, sqStore.searchPageObj];

    const switchPhotoProvider = function(providerName: availableProviderNames) { 
        sqStore.$patch({
            currPhotoProviderName: providerName,
        });
    }

    const isNumberKey = function(event: KeyboardEvent, numberInputObj: numberInputKeys) {

        // Check for allowed characters that are NOT numbers and allow their functionality as usual
        for(let i=0; i<allowedKeyboardCharacters.length; i++) {
            if(event?.key?.toLowerCase() === allowedKeyboardCharacters[i]) {
                const target = event.target as HTMLInputElement;
                if(target) {
                    currentInput.value = target;
                }
                return;
            }
        }
        
        // Strictly block other events - soon it will be detected if a pressed key is a desired number or not
        event.preventDefault();

        if(!validateInputKey(event)) return;

        const target = event.target as HTMLInputElement;

        if(target) {
            currentInput.value = target;
            currentInput.value.value += event.key;
            // If we exceed over the max value in number input, put the value back as max
            currentInput.value.value = (+currentInput.value.value > +target.max)? target.max : currentInput.value.value;
            // If we go below the min value in number input, put the value back as min
            currentInput.value.value = (+currentInput.value.value < +target.min)? target.min : currentInput.value.value;

            // Handle leading 0 issues or empty string value
            if(currentInput.value.value[0] === '0') { 
                while(currentInput.value.value[0] === '0') { currentInput.value.value = currentInput.value.value.slice(1) }
            }
            else if(currentInput.value.value === '') { currentInput.value.value = '0'}
            else { numberInputObj.current = +currentInput.value.value }
        }
    }

    const validateInputKey = function(ev: KeyboardEvent): boolean {
        if(!isNaN(+ev.key)) return true;
        return false;
    }

    const updateNumberInputValue = function(numberInputObj: numberInputKeys): void {
        if(!currentInput.value) return;
        // Keep if chain as it is - do not change any to if-else + below order is very important !
        if(currentInput.value.value === '0') { numberInputObj.current = numberInputObj.min; }
        if(currentInput.value.value[0] === '0' && currentInput.value.value.length > 1) {
            let leadingZerosInput = currentInput.value.value;
            while(leadingZerosInput[0] === '0') { leadingZerosInput = leadingZerosInput.slice(1); }
            currentInput.value.value = leadingZerosInput;
            numberInputObj.current = +leadingZerosInput;
        }
        if(currentInput.value.value === '') { numberInputObj.current = numberInputObj.default; }

        // Finally apply the correct value to the input tag
        if(numberInputObj.min <= +currentInput.value.value  &&  +currentInput.value.value <= numberInputObj.max) {
            // currentInput.value.value = numberInputObj.current.toString();
            numberInputObj.current = +currentInput.value.value;
        } else {
            currentInput.value.value = (numberInputObj.min > +currentInput.value.value)? numberInputObj.min.toString() : numberInputObj.max.toString();
            numberInputObj.current = +currentInput.value.value;
        }
    }

    onMounted(() => {
        // Mark the current PhotoProvider input as 'checked'
        const currentProviderInput = document.querySelector(`#${sqStore.currPhotoProviderName}`) as HTMLInputElement;
        if(currentProviderInput) currentProviderInput.checked = true;
    })

    onBeforeUnmount(() => {
        // Restore the inputs numeric values before unmounting
        if(pageNumberInput.value && outputPhotosInput.value) {
            searchPageObj.value.current = parseInt(pageNumberInput.value.value);
            outputPhotosObj.value.current = parseInt(outputPhotosInput.value.value);
        }
    })

</script>


<template>
    <div class="h-screen left-0 mt-4 px-6 w-full absolute bg-gray-200 overflow-auto">
        <div class="my-6">
            <section>
                <div class="relative flex items-center mb-6 mt-9">
                    <div class="w-12 h-0 py-[0.075rem] bg-black"></div>
                    <p class="relative text-2xl mx-3 inline-block"> Providers </p>
                    <div class="w-full h-0 py-[0.075rem] bg-black"></div>
                </div>

                <p class="text-base mb-6"> 
                    Choose the photo provider, from which to look for photos. You can pick one option at a time. 
                </p>

                <div class="flex flex-wrap">
                    <!-- Switch input + associated text -->
                    <div class="flex items-center mr-6">
                        <input type="radio" id="pixabay" name="provider" value="pixabay"
                            class="relative w-[4.5rem] h-8 my-4 mr-3 outline-none bg-[#333] appearance-none cursor-pointer rounded-3xl duration-500 shadow-[-0.1rem_-0.1rem_0.5rem_black] checked:bg-[lightgreen]"
                            @click="switchPhotoProvider('pixabay')"
                        >
                        <label for="pixabay" class="button text-lg">Pixabay</label> 
                    </div>

                    <div class="flex items-center mr-6">
                        <input type="radio" id="pexels" name="provider" value="pexels"
                            class="relative w-[4.5rem] h-8 my-4 mr-3 outline-none bg-[#333] appearance-none cursor-pointer rounded-3xl duration-500 shadow-[-0.1rem_-0.1rem_0.5rem_black] checked:bg-[lightgreen]"
                            @click="switchPhotoProvider('pexels')"
                        >
                        <label for="pexels" class="button text-lg">Pexels</label>
                    </div>

                    <div class="flex items-center mr-6">
                        <input type="radio" id="unsplash" name="provider" value="unsplash"
                            class="relative w-[4.5rem] h-8 my-4 mr-3 outline-none bg-[#333] appearance-none cursor-pointer rounded-3xl duration-500 shadow-[-0.1rem_-0.1rem_0.5rem_black] checked:bg-[lightgreen] :checked:before:left-6"
                            @click="switchPhotoProvider('unsplash')"
                        >
                        <label for="unsplash" class="button text-lg">Unsplash</label>
                    </div>
                </div>
            </section>

            <section>
                <div class="relative flex items-center mb-6 mt-9">
                    <div class="w-12 h-0 py-[0.075rem] bg-black"></div>
                    <p class="relative text-2xl mx-3 inline-block"> Searching </p>
                    <div class="w-full h-0 py-[0.075rem] bg-black"></div>
                </div>

                <p class="text-md mb-6"> 
                    Alter the search behavior by specifying number of output photos, initial search page, etc.
                </p>

                <div class="test mt-9 grid place-content-start grid-rows-[auto] grid-cols-[auto_auto] gap-y-6 items-center">
                    <label for="output_no" class="text-lg">Output photos: </label>
                    <input ref="outputPhotosInput" type="number" id="output_no" name="search" :placeholder="outputPhotosObj.default.toString()" :value="outputPhotosObj.current.toString()" :min="outputPhotosObj.min" :max="outputPhotosObj.max" @keydown="(event) => isNumberKey(event, sqStore.outputPhotosObj)"
                        class="text-base font-semibold text-center min-w-24 py-1 px-2 ml-6 outline-gray-500 bg-neutral-200 appearance-none cursor-pointer rounded-lg shadow-[0.1rem_0.1rem_0.5rem_black]"
                        @change="updateNumberInputValue(sqStore.outputPhotosObj)"
                    >

                    <label for="page_no" class="text-lg">Page number: </label>
                    <input ref="pageNumberInput" type="number" id="page_no" name="search" :placeholder="searchPageObj.default.toString()" :value="searchPageObj.current.toString()" :min="searchPageObj.min" :max="searchPageObj.max" @keydown="(event) => isNumberKey(event, sqStore.searchPageObj)"
                        class="text-base font-semibold text-center min-w-24 py-1 px-2 ml-6 outline-gray-500 bg-neutral-200 appearance-none cursor-pointer rounded-lg shadow-[0.1rem_0.1rem_0.5rem_black]"
                        @change="updateNumberInputValue(sqStore.searchPageObj)"
                    >

                    <!-- For debugging reasons only-->
                    <!-- <div class="w-7 h-4 bg-blue-400 text-white p-6" @click="debugTest"> Click me</div> -->
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>

    /* Stored :before styles here because Tailwind classes would become very messy  */

    input[type="radio"]:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 2rem;
        height: 2rem;
        background: #eee;
        border: .1rem solid #aaa;
        border-radius: 50%;
        transition: 0.5s;
    }

    input[type="radio"]:checked::before {
        left: 2.5rem;
    }

</style>