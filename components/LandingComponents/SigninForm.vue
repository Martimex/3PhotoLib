<script setup lang="ts">
    import { faCircleUser, faEnvelope, faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
    import { keyToValidator } from '@/validators/formValidators';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import type { registrationFormProp } from '../../types/type_utilities';

    const sStore = useStatusStore();
    const tStore = useTemporalStore();

    function handleErrorTracing(isErrorPresent: boolean, key: string, errorMsg?: string): void {
        if(isErrorPresent) {
            registerForm[key].inputElement?.value.classList.add('border-b-red-500');
            if(registerForm[key].errorMsgElement) {
                registerForm[key].errorMsgElement.value.classList.remove('hidden');
                registerForm[key].errorMsgElement.value.textContent = errorMsg;
            } 
        } else {
            registerForm[key].inputElement?.value.classList.remove('border-b-red-500');
            if(registerForm[key].errorMsgElement) {
                registerForm[key].errorMsgElement.value.classList.add('hidden');
                registerForm[key].errorMsgElement.value.textContent = '';
            }
        }
    }

    async function handleSignUp(): Promise<void> {
        
        // Add name and e-mail as a temporal values (only on account first registration)
        tStore.registeredUser_name = registerForm.username.text.value;
        tStore.registeredUser_email = registerForm.email.text.value;

        await $fetch('/account/create', { method: 'post', body: {
            formData: {
                username: registerForm.username.text.value,
                email: registerForm.email.text.value,
                password: registerForm.password.text.value,
            }
        }});

        // Finally, change component to the Verification form
        tStore.verification_redirectedFrom = 'signin';
        sStore.currentHomePageView = 'verify';
    }

    async function handleUserRegistration() {

        console.log('TESTING...');

        let validationsPassed = 0;

        Object.keys(registerForm).forEach((key: string) => { 
            const validation = keyToValidator[key].safeParse(registerForm[key].text.value);
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

        if(validationsPassed === Object.keys(registerForm).length) {
            // Now perform final two checks: Check if e-mail adress and Username already exists in the database.
            const checkUniqueEmailAndUsername = await $fetch('/register/validate', {method: 'post', body: {
                formData: {
                    form_username: registerForm.username.text.value,
                    form_email: registerForm.email.text.value
                }
            }}).then(res => {
                if(typeof res === 'string') {
                    handleErrorTracing(true, res, `This ${res.charAt(0).toUpperCase() + res.slice(1)} is already taken!`);
                    return false;
                }
                // If the return is boolean (not string), then both email and username are unique ! 
                else return true;
            }).then((isUnique => isUnique))

            if(!checkUniqueEmailAndUsername) return;

            // Success! All fields are field correctly. Now perform account creation and show a VERIFY component
            await handleSignUp();
        }

    }

    const registerForm: {[key: string]: registrationFormProp}  = {
        username: {text: ref<string>(""), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: ref()},
        email: {text: ref<string>(""), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: ref()},
        password: {text: ref<string>(""), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: ref()},
        isTOSAccepted: {text: ref<string>(""), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: null}
    };

</script>

<template>
    <h1 class="main-title text-6xl font-semibold font-mono text-center mb-8"> Sign In </h1>
    <h2 class="main-title-alt text-xl font-mono text-center mt-4 mb-6"> New to 3PhotoLib? Please register first to use the service. </h2>
    <form id="signin" name="signin" method="post"  class="mx-3" @submit.prevent="handleUserRegistration">
        <div class="my-4">
            <div :ref="registerForm.username.inputElement" class="flex my-3 w-full outline-gray-500 bg-neutral-200 rounded-md shadow-[0.1rem_0.1rem_0.5rem_black] border-y-4 box-border">
                <FontAwesomeIcon :icon="faCircleUser" class="text-5xl text-[#222c] drop-icon mx-3 my-auto px-1"></FontAwesomeIcon>
                <div class="relative w-full">
                    <input  type="text" aria-label="Choose a username" id="username" name="username" value="" v-model="registerForm.username.text.value" placeholder="Username..." 
                        class="text-black text-lg font-semibold text-center w-full py-5 px-2 outline-[#222c] bg-neutral-200 appearance-none cursor-pointer rounded-lg rounded-l-none border-l-2  border-[#222c] border-dashed" 
                    />
                    <span :ref="registerForm.username.errorMsgElement" class="absolute bottom-0 left-0 text-red-500 font-bold text-xs w-full inline-block text-center" :class="registerForm.username.isTextCorrect.value? 'hidden' : 'inline-block'"> Error: Some error occured </span>
                </div>
            </div>
        </div>

        <div class="my-4">
            <div :ref="registerForm.email.inputElement" class="flex my-3 w-full outline-gray-500 bg-neutral-200 rounded-md shadow-[0.1rem_0.1rem_0.5rem_black] border-y-4 box-border">
                <FontAwesomeIcon :icon="faEnvelope" class="text-5xl text-[#222c] drop-icon mx-3 my-auto px-1"></FontAwesomeIcon>
                <div class="relative w-full">
                    <input type="email" aria-label="Use an e-mail address" id="email" name="email" value="" v-model="registerForm.email.text.value" placeholder="E-mail..."
                    class="text-black text-lg font-semibold text-center w-full py-5 px-2 outline-[#222c] bg-neutral-200 appearance-none cursor-pointer rounded-lg rounded-l-none border-l-2  border-[#222c] border-dashed" 
                    />
                    <span :ref="registerForm.email.errorMsgElement" class="absolute bottom-0 left-0 text-red-500 font-bold text-xs w-full inline-block text-center" :class="registerForm.email.isTextCorrect.value? 'hidden' : 'inline-block'"> Error: Some error occured </span>
                </div>
            </div>
        </div>

        <div class="my-4">
            <div :ref="registerForm.password.inputElement" class="flex my-3 w-full outline-gray-500 bg-neutral-200 rounded-md shadow-[0.1rem_0.1rem_0.5rem_black] border-y-4 box-border">
                <FontAwesomeIcon :icon="faRectangleXmark" class="text-5xl text-[#222c] drop-icon mx-3 my-auto px-1"></FontAwesomeIcon>
                <div class="relative w-full">
                    <input type="password" aria-label="Set a password" id="password" name="password" value="" v-model="registerForm.password.text.value" placeholder="Password..." 
                        class="text-black text-lg font-semibold text-center w-full py-5 px-2 outline-[#222c] bg-neutral-200 appearance-none cursor-pointer rounded-lg rounded-l-none border-l-2  border-[#222c] border-dashed" 
                    />
                    <span :ref="registerForm.password.errorMsgElement" class="absolute bottom-0 left-0 text-red-500 text-xs font-bold w-full inline-block text-center" :class="registerForm.password.isTextCorrect.value? 'hidden' : 'inline-block'"> Error: Some error occured </span>
                </div>
            </div>
        </div>

        <label class="flex ml-3">
            <input :ref="registerForm.isTOSAccepted.inputElement" aria-label="Consent" required id="consent" name="consent" type="checkbox" placeholder="" v-model="registerForm.isTOSAccepted.text.value" class="inline-block w-6 h-6 mr-3 cursor-pointer rounded-lg shadow-[0.1rem_0.1rem_0.5rem_black" />
            <span class="main-title-alt text-md">I've read and accept the <a class="underline font-semibold" target="_blank" href="#"> Terms of Service </a></span>
        </label>

        <div class="mt-8 mb-4  py-5 px-8 min-w-24 max-w-[40vw] min-h-10 bg-[#111a] rounded-full mx-auto flex justify-center"> 
            <button class="main-title-alt text-xl text-center font-bold text-nowrap" type="submit" > 
                Continue 
            </button> 
        </div>
    </form>

    <LandingComponentsFormSwitch />
</template>

<style scoped>

.main-title {
    font-family: Montserrat, 'Arial Narrow Bold', sans-serif, Haettenschweiler;
    text-shadow: -.25rem -.25rem .33rem #111;
    filter: drop-shadow(0rem 0rem .25rem #000);
}

.main-title-alt {
    font-family: Montserrat, 'Arial Narrow Bold', sans-serif, Haettenschweiler;
    filter: drop-shadow(.12rem .12rem .1rem #000);
}

.drop-icon {
    filter: drop-shadow(0 0 .22rem #444);
}

</style>