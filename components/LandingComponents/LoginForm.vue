<script setup lang="ts">
    import { faEnvelope, faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { keyToValidator } from '@/validators/formValidators';
    import type { registrationFormProp } from '../../types/type_utilities';

    const sStore = useStatusStore();
    const tStore = useTemporalStore();

    const loginForm: {[key: string]: registrationFormProp}  = {
        email: {text: ref<string>(""), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: ref()},
        password: {text: ref<string>(""), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: ref()}
    };

    function handleErrorTracing(isErrorPresent: boolean, key: string, errorMsg?: string): void {
        if(isErrorPresent) {
            loginForm[key].inputElement?.value.classList.add('border-b-red-500');
            if(loginForm[key].errorMsgElement) {
                loginForm[key].errorMsgElement.value.classList.remove('hidden');
                loginForm[key].errorMsgElement.value.textContent = errorMsg;
            } 
        } else {
            loginForm[key].inputElement?.value.classList.remove('border-b-red-500');
            if(loginForm[key].errorMsgElement) {
                loginForm[key].errorMsgElement.value.classList.add('hidden');
                loginForm[key].errorMsgElement.value.textContent = '';
            }
        }
    }

    async function handleUserLogin() {

        // First validate if user provided a correct email format and password format
        let validationsPassed = 0;

        Object.keys(loginForm).forEach((key: string) => { 
            const validation = keyToValidator[key].safeParse(loginForm[key].text.value);
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

        if(validationsPassed === Object.keys(loginForm).length) { 
            handleErrorTracing(false, 'email'); 

            // Now perform server-side validation - check if there is an accout for this credentials
            const doesAccountExist = await $fetch(`/login/validate`, { method: 'post', body: {
                formData: {
                    form_email: loginForm.email.text.value,
                    form_password: loginForm.password.text.value
                }
            }}).then((res) => {
                // Null here represents a state where account is present in the database, but it is yet unverified
                if(typeof res === 'string') {
                    // User created an account, but it is not yet verified. Redirect to a verification component
                    tStore.registeredUser_name = res;
                    tStore.registeredUser_email = loginForm.email.text.value;
                    tStore.verification_redirectedFrom = 'login';
                    sStore.currentHomePageView = 'verify';
                    return false;
                }
                else if(res === false) { 
                    handleErrorTracing(true, 'email', 'E-mail or password are incorrect');
                    handleErrorTracing(true, 'password', 'E-mail or password are incorrect');
                }
                return res;
            })

            if(!doesAccountExist) return;
            
            // Account does exist, and credentials are correct, so user can be logged in !
            await handleLogin();
        }
    }

    async function handleLogin(): Promise<void> {

        // User logged in! Now redirect to the home page
        await navigateTo('/home');
        sStore.currentHomePageView = 'welcome';
    }

</script>

<template>
    <h1 class="main-title text-6xl font-semibold font-mono text-center mb-8"> Log In </h1>
    <h2 class="main-title-alt text-xl font-mono text-center mt-4 mb-6"> Already using 3PhotoLib? Please login to continue. </h2>
    <form id="login" name="login" method="post" action="" class="mx-3" @submit.prevent="handleUserLogin">
        <div class="my-4">
            <div :ref="loginForm.email.inputElement" class="flex my-3 w-full outline-gray-500 bg-neutral-200 rounded-md shadow-[0.1rem_0.1rem_0.5rem_black] border-y-4 box-border">
                <FontAwesomeIcon :icon="faEnvelope" class="text-5xl text-[#222c] drop-icon mx-3 my-auto px-1"></FontAwesomeIcon>
                <div class="relative w-full">
                    <input type="email" aria-label="Use an e-mail address" id="email" name="email" value="" v-model="loginForm.email.text.value" placeholder="E-mail..."
                    class="text-black text-lg font-semibold text-center w-full py-5 px-2 outline-[#222c] bg-neutral-200 appearance-none cursor-pointer rounded-lg rounded-l-none border-l-2  border-[#222c] border-dashed" 
                    />
                    <span :ref="loginForm.email.errorMsgElement" class="absolute bottom-0 left-0 text-red-500 font-bold text-xs w-full inline-block text-center" :class="loginForm.email.isTextCorrect.value? 'hidden' : 'inline-block'"> Error: Some error occured </span>
                </div>
            </div>
        </div>

        <div class="my-4">
            <div :ref="loginForm.password.inputElement" class="flex my-3 w-full outline-gray-500 bg-neutral-200 rounded-md shadow-[0.1rem_0.1rem_0.5rem_black] border-y-4 box-border">
                <FontAwesomeIcon :icon="faRectangleXmark" class="text-5xl text-[#222c] drop-icon mx-3 my-auto px-1"></FontAwesomeIcon>
                <div class="relative w-full">
                    <input type="password" aria-label="Set a password" id="password" name="password" value="" v-model="loginForm.password.text.value" placeholder="Password..." 
                        class="text-black text-lg font-semibold text-center w-full py-5 px-2 outline-[#222c] bg-neutral-200 appearance-none cursor-pointer rounded-lg rounded-l-none border-l-2  border-[#222c] border-dashed" 
                    />
                    <span :ref="loginForm.password.errorMsgElement" class="absolute bottom-0 left-0 text-red-500 text-xs font-bold w-full inline-block text-center" :class="loginForm.password.isTextCorrect.value? 'hidden' : 'inline-block'"> Error: Some error occured </span>
                </div>
            </div>
        </div>

        <span class="main-title-alt text-md underline font-semibold cursor-pointer mx-3"
            @click="sStore.setCurrentHomePageView('reset')"
        > 
            Forgot password ? Reset it here
        </span>

        <div class="mt-8 mb-4  py-5 px-8 min-w-24 max-w-[40vw] min-h-10 bg-[#111a] rounded-full mx-auto flex justify-center"> 
            <button class="main-title-alt text-xl text-center font-bold text-nowrap" type="submit" > Log in </button> 
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