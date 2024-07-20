<script setup lang="ts">
    import type { registrationFormProp } from '../../types/type_utilities';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faSquareCheck, faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
    import { faRectangleXmark as faRectangleXmark_solid  } from '@fortawesome/free-solid-svg-icons';
    import { keyToValidator } from '../../validators/formValidators';


    const sStore = useStatusStore();
    const tStore = useTemporalStore();

    const headingFirstSentence = ref();

    const newPasswordForm: {[key: string]: registrationFormProp}  = {
        verificationCode: {text: ref<string>(""), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: ref()},
        password: {text: ref<string>(""), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: ref()},
        resendCodeLink: {text: ref<string>(""), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: ref()},
        confirmpassword: {text: ref<string>(""), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: ref()},
    };

    function handleErrorTracing(isErrorPresent: boolean, key: string, errorMsg?: string): void {
        if(isErrorPresent) {
            newPasswordForm[key].inputElement?.value?.classList?.add('border-b-red-500');
            if(newPasswordForm[key].errorMsgElement) {
                newPasswordForm[key].errorMsgElement.value.classList.remove('hidden');
                newPasswordForm[key].errorMsgElement.value.textContent = errorMsg;
            } 
        } else {
            newPasswordForm[key].inputElement?.value?.classList?.remove('border-b-red-500');
            if(newPasswordForm[key].errorMsgElement) {
                newPasswordForm[key].errorMsgElement.value.classList.add('hidden');
                newPasswordForm[key].errorMsgElement.value.textContent = '';
            }
        }
    }

    onMounted(() => {
        // Check the conditions to send a verification code via e-mail. If conditions are met (mostly time elapsed)
        // - perform an action and change appropiate messages inside this view (conditionally)
        headingFirstSentence.value = tStore.isResetPasswordMailSent? 'Now, we have sent you a verification code' : 'You have already got a verification code';
    })

    async function handleFormValidation() {
        
        const [password_validation, confirmpassword_validation] = [
            keyToValidator['password'].safeParse(newPasswordForm['password'].text.value),
            keyToValidator['password'].safeParse(newPasswordForm['confirmpassword'].text.value)
        ];
        const [password_validationResult, confirmPassword_validationResult] = [password_validation.success, confirmpassword_validation.success];
    
        let isValidationPassed: boolean = true;

        // Initially clean verification code for every validation retry (the ongoing errors will be caught later)
        handleErrorTracing(false, 'verificationCode');

        if(!password_validationResult)   { handleErrorTracing(true, 'password', password_validation.error.issues[0].message); isValidationPassed = false; }
        else { handleErrorTracing(false, 'password'); }
        if(!confirmPassword_validationResult) { handleErrorTracing(true, 'confirmpassword', confirmpassword_validation.error.issues[0].message); isValidationPassed = false; }
        else { handleErrorTracing(false, 'confirmpassword'); }

        if(!isValidationPassed) { return; }

        // Check if those passwords matches - those have to
        if(newPasswordForm['password'].text.value !== newPasswordForm['confirmpassword'].text.value) {
            handleErrorTracing(true, 'password', 'Password fields have different text');
            handleErrorTracing(true, 'confirmpassword', 'Password fields have different text');
            isValidationPassed = false; 
        }

        if(!isValidationPassed) { return; }

        handleErrorTracing(false, 'password');
        handleErrorTracing(false, 'confirmpassword');

        // Passwords are fine! Now check if verification code is OK
        handleVerificationCodeCheck()
    }

    function handleVerificationCodeCheck() {
        // First check if the verification code is not kept in temporal store (to reduce db queries)
        console.log('tStore.verificationCodeKey : ', tStore.verificationCodeKey)
        if(tStore.verificationCodeKey) { vCodeLocalCompare(); }
        else vCodeServerCompare();
    }

    function vCodeLocalCompare() {
        proceedValidation(Boolean(newPasswordForm.verificationCode.text.value.toString() === tStore.verificationCodeKey.toString()));
    }

    async function vCodeServerCompare() {

        await $fetch('/reset/validate', {method: 'post', body: {
            accountData: {
                email: tStore.resetPassword_email,
                verifyCode_attempt: newPasswordForm.verificationCode.text.value.toString()
            }
        }}).then(res => {
            if(res.verifyCode) { tStore.verificationCodeKey = res.verifyCode; }
            proceedValidation(res.isVerificationSucessful)
        });
    }

    async function proceedValidation(isVerificationOK: boolean) {

        if(!isVerificationOK) {
            newPasswordForm['verificationCode'].inputElement?.value.classList.add('border-b-red-500');
            if(newPasswordForm['verificationCode'].errorMsgElement) {
                newPasswordForm['verificationCode'].errorMsgElement.value.classList.remove('hidden');
                newPasswordForm['verificationCode'].errorMsgElement.value.textContent = `Incorrect verification code!`;
            } 
        } else {
            // Account verified ! Now user can be safely logged in and redirected to the main app page
            newPasswordForm['verificationCode'].inputElement?.value.classList.remove('border-b-red-500');
            newPasswordForm['verificationCode'].inputElement?.value.classList.add('border-b-green-500');
            if(newPasswordForm['verificationCode'].errorMsgElement) {
                newPasswordForm['verificationCode'].errorMsgElement.value.classList.replace('text-red-500', 'text-green-500');
                newPasswordForm['verificationCode'].errorMsgElement.value.classList.remove('hidden');
                newPasswordForm['verificationCode'].errorMsgElement.value.textContent = `Correct`;
            }
            
            await $fetch('/reset/confirm', {method: 'post', body: {
                accountData: {
                    email: tStore.resetPassword_email
                },
                miscData: {
                    password_new: newPasswordForm['password'].text.value
                }
            }});

            sStore.currentHomePageView = 'login';
            sStore.removeHomePageViewHierarchy(2);
        }
    }


    async function handleRetryPasswordResetEmail() {
        const remainCooldownHours_local = tStore.calcRemainHoursCooldown(tStore.cooldown_start_passwordReset, new Date().getTime(), tStore.requiredElapseHours);

        // This is a local check that will be caught every time during the cooldown, preventing from multiple database calls meantime.
        // It stops working as soon as the cooldown ends, so that a new link can be sent again (via server) and now this local check
        // starts working again, etc.
        if(remainCooldownHours_local > 0) {
            if(newPasswordForm['resendCodeLink'].errorMsgElement) {
                newPasswordForm['resendCodeLink'].errorMsgElement.value.classList.replace('text-green-500', 'text-red-500');
                newPasswordForm['resendCodeLink'].errorMsgElement.value.textContent = `❌ Send limit exceeded! Try again in ${remainCooldownHours_local} hours.`;
            }
            return;
        }

        await $fetch('/reset/verify', {method: 'post', body: {
            accountData: {
                email: tStore.resetPassword_email
            },
            miscData: {
                requiredElapseHours: tStore.requiredElapseHours,
            }
        }}).then(res => {
            if(newPasswordForm['resendCodeLink'].errorMsgElement) {
                if(res && typeof res === 'string') {
                    newPasswordForm['resendCodeLink'].errorMsgElement.value.classList.replace('text-red-500', 'text-green-500')
                    newPasswordForm['resendCodeLink'].errorMsgElement.value.textContent = `✅ Verification link sent successfully! `;
                    // Update temporal verification code to reduce db queries
                    tStore.verificationCodeKey = res;
                    // Update temporal cooldown start (to prevent further db queries during the cooldown)
                    tStore.cooldown_start_passwordReset = BigInt(new Date().getTime());
                } 
                else if(typeof res === 'number') {
                    newPasswordForm['resendCodeLink'].errorMsgElement.value.classList.replace('text-green-500', 'text-red-500');
                    newPasswordForm['resendCodeLink'].errorMsgElement.value.textContent = `❌ Send limit exceeded! Try again in ${res} hours.`;
                }
            }
        });
    }

</script>

<template>
    <LandingComponentsFormClose />
    <h1 class="main-title text-6xl font-semibold font-mono text-center mb-8 pointer-events-none"> Confirm reset </h1>
    <h2 class="main-title-alt text-xl font-mono text-center mt-4 mb-6"> {{ headingFirstSentence }}. Please use it to set a new password for your account.  </h2>
    <form id="newpassword" name="newpassword" method="post" action="" class="mx-3" @submit.prevent="handleFormValidation">
        <div class="my-4">
            <div :ref="newPasswordForm.verificationCode.inputElement" class="flex my-3 w-full outline-gray-500 bg-neutral-200 rounded-md shadow-[0.1rem_0.1rem_0.5rem_black] border-y-4 box-border">
                <FontAwesomeIcon :icon="faSquareCheck" class="text-5xl text-[#222c] drop-icon mx-3 my-auto px-2"></FontAwesomeIcon>
                <div class="relative w-full">
                    <input type="number" min="0" max="999999" aria-label="Write your verification code here" id="verify" name="verify" value="" v-model="newPasswordForm.verificationCode.text.value" placeholder="Verification code"
                        class="text-black text-lg font-semibold text-center w-full py-5 px-2 outline-[#222c] bg-neutral-200 appearance-none cursor-pointer rounded-lg rounded-l-none border-l-2  border-[#222c] border-dashed" 
                    />
                    <span :ref="newPasswordForm.verificationCode.errorMsgElement" class="absolute bottom-0 left-0 text-red-500 font-bold text-xs w-full inline-block text-center" :class="newPasswordForm.verificationCode.isTextCorrect? 'hidden' : 'inline-block'"> Error: Some error occured </span>
                </div>
            </div>
        </div>
        
        <div class="my-4">
            <div :ref="newPasswordForm.password.inputElement" class="flex my-3 w-full outline-gray-500 bg-neutral-200 rounded-md shadow-[0.1rem_0.1rem_0.5rem_black] border-y-4 box-border">
                <FontAwesomeIcon :icon="faRectangleXmark" class="text-5xl text-[#222c] drop-icon mx-3 my-auto px-1"></FontAwesomeIcon>
                <div class="relative w-full">
                    <input type="password" aria-label="Set a password" id="password" name="password" value="" v-model="newPasswordForm.password.text.value" placeholder="Password..." 
                        class="text-black text-lg font-semibold text-center w-full py-5 px-2 outline-[#222c] bg-neutral-200 appearance-none cursor-pointer rounded-lg rounded-l-none border-l-2  border-[#222c] border-dashed" 
                    />
                    <span :ref="newPasswordForm.password.errorMsgElement" class="absolute bottom-0 left-0 text-red-500 text-xs font-bold w-full inline-block text-center" :class="newPasswordForm.password.isTextCorrect.value? 'hidden' : 'inline-block'"> Error: Some error occured </span>
                </div>
            </div>
        </div>

        <div class="my-4">
            <div :ref="newPasswordForm.confirmpassword.inputElement" class="flex my-3 w-full outline-gray-500 bg-neutral-200 rounded-md shadow-[0.1rem_0.1rem_0.5rem_black] border-y-4 box-border">
                <FontAwesomeIcon :icon="faRectangleXmark_solid" class="text-5xl text-[#222c] drop-icon mx-3 my-auto px-1"></FontAwesomeIcon>
                <div class="relative w-full">
                    <input type="password" aria-label="Set a password" id="confirmpassword" name="confirmpassword" value="" v-model="newPasswordForm.confirmpassword.text.value" placeholder="Confirm password..." 
                        class="text-black text-lg font-semibold text-center w-full py-5 px-2 outline-[#222c] bg-neutral-200 appearance-none cursor-pointer rounded-lg rounded-l-none border-l-2  border-[#222c] border-dashed" 
                    />
                    <span :ref="newPasswordForm.confirmpassword.errorMsgElement" class="absolute bottom-0 left-0 text-red-500 text-xs font-bold w-full inline-block text-center" :class="newPasswordForm.confirmpassword.isTextCorrect.value? 'hidden' : 'inline-block'"> Error: Some error occured </span>
                </div>
            </div>
        </div>

        <span class="main-title-alt text-md underline font-semibold cursor-pointer mx-3"
            @click="handleRetryPasswordResetEmail()"
        > 
            Send the code again
        </span>

        <span :ref="newPasswordForm.resendCodeLink.errorMsgElement" class="main-title-alt text-red-500 font-bold text-sm w-full inline-block my-3 mx-3">  </span>

        <div class="mt-8 mb-4  py-5 px-8 min-w-24 max-w-[40vw] min-h-10 bg-[#111a] rounded-full mx-auto flex justify-center"> 
            <button class="main-title-alt text-xl text-center font-bold text-nowrap" type="submit" > Confirm </button> 
        </div>
    </form>
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