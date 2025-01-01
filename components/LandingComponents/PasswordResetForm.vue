<script setup lang="ts">
    import type { registrationFormProp } from '../../types/type_utilities';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
    import { keyToValidator } from '../../validators/formValidators';

    const sStore = useStatusStore();
    const tStore = useTemporalStore();

    const resetPasswordForm: {[key: string]: registrationFormProp}  = {
        email: {text: ref<string>(''), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: ref()},
        resendCodeLink: { text: ref<string>(''), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: ref()  }
    };

    function handleErrorTracing(isErrorPresent: boolean, key: string, errorMsg?: string): void {
        if(isErrorPresent) {
            resetPasswordForm[key].inputElement?.value?.classList?.add('border-b-red-500');
            if(resetPasswordForm[key].errorMsgElement) {
                resetPasswordForm[key].errorMsgElement.value.classList.remove('hidden');
                resetPasswordForm[key].errorMsgElement.value.textContent = errorMsg;
            } 
        } else {
            resetPasswordForm[key].inputElement?.value?.classList?.remove('border-b-red-500');
            if(resetPasswordForm[key].errorMsgElement) {
                resetPasswordForm[key].errorMsgElement.value.classList.add('hidden');
                resetPasswordForm[key].errorMsgElement.value.textContent = '';
            }
        }
    }
    
    async function handlePasswordReset() {
        
        const validation = keyToValidator['email'].safeParse(resetPasswordForm['email'].text.value);
        const validationResult = validation.success;
        if(!validationResult) { 
            // Validation did not pass for this field. 
            handleErrorTracing(true, 'email', validation.error.issues[0].message);
            return;
        }
        // Remove any error traces from the UI + it did work client-side.
        handleErrorTracing(false, 'email');
        const isEmailUsed = await $fetch('/reset/test', {method: 'post', body: {
            formData: {
                email: resetPasswordForm.email.text.value
            }
        }}).then(data => data);

        // Now perform a check if the e-mail already exists in the database (before doing any further actions)

        if(!isEmailUsed) {
            // E-mail was not used to register any of the existing accounts - could be null or false
            handleErrorTracing(true, 'email', (isEmailUsed === false)? 'The account is yet unverified' : 'Email is not used for any account');
            return;
        }

        // Order strictly important !
        tStore.resetPassword_email = resetPasswordForm.email.text.value.toLowerCase();

        // Now lets try to send an email and store a result if the email was sent or not (because of elapsed time hours)
        await handleSetPasswordResetEmail();

        // All checks went good! Proceed
        sStore.addHomePageViewHierarchy('reset');
        sStore.currentHomePageView = 'new';
    }

    async function handleSetPasswordResetEmail() {
        const cooldownHours = await $fetch('/reset/verify', { method: 'post', body: {
            accountData: {
                email: tStore.resetPassword_email
            },
            miscData: {
                requiredElapseHours: tStore.requiredElapseHours,
            }
        }}).then((res) => {
            // Update temporal verification code to reduce db queries
            if(typeof res === 'string') { tStore.verificationCodeKey = res; return 0; }
            else return res;
        });

        tStore.isResetPasswordMailSent = (cooldownHours > 0)? false : true;
    }

</script>

<template>
    <section class="max-w-[95vw]
        sm:w-[90vw] sm:max-w-[675px]
        lg:w-[60vw] lg:max-w-[800px]"
    >
        <LandingComponentsFormClose />
        <h1 class="main-title text-5xl font-semibold font-mono text-center mb-7 pointer-events-none"> Reset password </h1>
        <h2 class="main-title-alt text-lg font-mono text-center mt-4 mb-6
            lg:max-w-[80%] lg:mx-auto
        "> Please provide your e-mail first to proceed </h2>
        <form id="resetpassword" name="resetpassword" method="post" action="" class="mx-3" @submit.prevent="handlePasswordReset">
            <div class="my-4 mx-auto w-[90%] 
                sm:w-[60%]
                lg:w-[50%]
            ">
                <div :ref="resetPasswordForm.email.inputElement" class="flex my-3 w-full outline-gray-500 bg-neutral-200 rounded-md shadow-[0.1rem_0.1rem_0.5rem_black] border-y-4 box-border">
                    <FontAwesomeIcon :icon="faEnvelope" class="text-4xl text-[#222c] drop-icon mx-3 my-auto px-1"></FontAwesomeIcon>
                    <div class="relative w-full">
                        <input type="email" aria-label="Use an e-mail address" id="email" name="email" value="" v-model="resetPasswordForm.email.text.value" placeholder="E-mail..."
                        class="text-black text-base font-semibold text-center w-full py-4 px-2 outline-[#222c] bg-neutral-200 appearance-none cursor-text rounded-lg rounded-l-none border-l-2  border-[#222c] border-dashed" 
                        />
                        <span :ref="resetPasswordForm.email.errorMsgElement" class="absolute bottom-0 left-0 text-red-500 font-bold text-xs w-full inline-block text-center" :class="resetPasswordForm.email.isTextCorrect.value? 'hidden' : 'inline-block'"> Error: Some error occured </span>
                    </div>
                </div>
            </div>

    <!--         <span class="main-title-alt text-md underline font-semibold cursor-pointer mx-3"
                @click="handleRetryPasswordResetEmail()"
            > 
                Send the code again
            </span>

            <span :ref="resetPasswordForm.resendCodeLink.errorMsgElement" class="main-title-alt text-red-500 font-bold text-sm w-full inline-block my-3 mx-3">  </span> -->

            <button type="submit" class="mt-8 mb-4 py-5 px-10 w-fit max-w-[50vw] min-h-10 bg-[#111a] rounded-md mx-auto flex justify-center"> 
                <p class="main-title-alt text-xl text-center font-bold text-nowrap" > Confirm </p> 
            </button>
        </form>
    </section>
</template>

<style scoped>
    .main-title {
        font-family: Montserrat, 'Arial Narrow Bold', sans-serif, Haettenschweiler;
        text-shadow: -.2rem -.2rem .33rem #222;
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