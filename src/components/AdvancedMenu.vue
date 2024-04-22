<script setup lang="ts">
    import { ref } from 'vue';
    import { useSearchQueryStore } from '../stores/searchQueryStore';
    import type { availableProviderNames } from '@/types/type_utilities';
    import PhotoProvider from '@/providers/photoProvidersInitializer';

    const allowedKeyboardCharacters = ['backspace', 'delete', 'arrowup', 'arrowright', 'arrowleft', 'arrowdown'];
    const currentInput = ref<HTMLInputElement | null>(null); 
    const sqStore = useSearchQueryStore();

    const switchPhotoProvider = function(providerName: availableProviderNames) { 
        sqStore.$patch({
            currPhotoProvider: new PhotoProvider(providerName).setCurrentProvider(),
        });
    }

    const isNumberKey = function(event: KeyboardEvent) {
        //console.log(event/* ?.target *//* ?.value */);

        //console.warn(event.key.toLowerCase());

        // Check for allowed characters that are NOT numbers and allow their functionality as usual
        for(let i=0; i<allowedKeyboardCharacters.length; i++) {
            if(event?.key?.toLowerCase() === allowedKeyboardCharacters[i]) return;
        }
        
        // Strictly block other events - soon it will be detected if a pressed key is a desired number or not
        event.preventDefault();

        if(!validateInputKey(event)) return;

        const target = event.target as HTMLInputElement;

        console.log(+target.max, event);

        if(target) {
            currentInput.value = target;
            currentInput.value.value += event.key;
            // If we exceed over the max value in number input, put the value back as max
            currentInput.value.value = (+currentInput.value.value > +target.max)? target.max : currentInput.value.value;
            // If we go below the min value in number input, put the value back as min
            currentInput.value.value = (+currentInput.value.value < +target.min)? target.min : currentInput.value.value;

            // Handle leading 0 issues or empty string value
            if(currentInput.value.value[0] === '0') { currentInput.value.value = currentInput.value.value.slice(1) }
            else if(currentInput.value.value === '') { currentInput.value.value = '0'}
            
        }
    }

    const validateInputKey = function(ev: KeyboardEvent): boolean {
        //return true;
        if(!isNaN(+ev.key)) return true;
        return false;
    }
</script>


<template>
    <div class="h-screen left-0 mt-6 px-6 w-full absolute bg-gray-200 overflow-auto">
        <div class="my-6">
            <section>
                <div class="relative flex items-center mb-6 mt-9">
                    <div class="w-12 h-0 py-[0.075rem] bg-black"></div>
                    <p class="relative text-2xl mx-3 inline-block"> Providers </p>
                    <div class="w-full h-0 py-[0.075rem] bg-black"></div>
                </div>

                <p class="text-md mb-6"> 
                    Choose the photo provider, from which to look for photos. You can pick one option at a time. 
                </p>

                <div class="flex flex-wrap">
                    <!-- Switch input + associated text -->
                    <div class="flex items-center mr-6">
                        <input type="radio" id="pixabay" name="provider" value="pixabay" checked
                            class="relative w-[4.5rem] h-8 my-4 mr-3 outline-none bg-[#333] appearance-none cursor-pointer rounded-3xl duration-500 shadow-[-0.1rem_-0.1rem_0.5rem_black] checked:bg-[lightgreen]"
                            @click="switchPhotoProvider('pixabay')"
                        >
                        <label for="pixabay" class="button text-lg font-semibold">Pixabay</label> 
                    </div>

                    <div class="flex items-center mr-6">
                        <input type="radio" id="pexels" name="provider" value="pexels"
                            class="relative w-[4.5rem] h-8 my-4 mr-3 outline-none bg-[#333] appearance-none cursor-pointer rounded-3xl duration-500 shadow-[-0.1rem_-0.1rem_0.5rem_black] checked:bg-[lightgreen]"
                            @click="switchPhotoProvider('pexels')"
                        >
                        <label for="pexels" class="button text-lg font-semibold">Pexels</label>
                    </div>

                    <div class="flex items-center mr-6">
                        <input type="radio" id="unsplash" name="provider" value="unsplash"
                            class="relative w-[4.5rem] h-8 my-4 mr-3 outline-none bg-[#333] appearance-none cursor-pointer rounded-3xl duration-500 shadow-[-0.1rem_-0.1rem_0.5rem_black] checked:bg-[lightgreen] :checked:before:left-6"
                            @click="switchPhotoProvider('unsplash')"
                        >
                        <label for="unsplash" class="button text-lg font-semibold">Unsplash</label>
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
                    <label for="output_no" class="text-lg font-semibold">Output photos: </label>
                    <input type="number" id="output_no" name="search" placeholder="10"  value="10" min="1" max="20" @keydown="isNumberKey"
                        class="text-base font-semibold text-center min-w-24 py-1 px-2 ml-6 outline-gray-500 bg-neutral-200 appearance-none cursor-pointer rounded-lg shadow-[0.1rem_0.1rem_0.5rem_black]"
                    >

                    <label for="page_no" class="text-lg font-semibold">Page number: </label>
                    <input type="number" id="page_no" name="search" placeholder="1" value="1" min="1" max="9999" @keydown="isNumberKey"
                        class="text-base font-semibold text-center min-w-24 py-1 px-2 ml-6 outline-gray-500 bg-neutral-200 appearance-none cursor-pointer rounded-lg shadow-[0.1rem_0.1rem_0.5rem_black]"
                    >
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