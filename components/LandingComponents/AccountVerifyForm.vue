<script setup lang="ts">
    import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import type { registrationFormProp } from '../../types/type_utilities';


    const verifyForm: {[key: string]: registrationFormProp}  = {
        verificationCode: {text: ref<string>(""), isTextCorrect: ref<boolean>(true), inputElement: ref(), errorMsgElement: ref()},
        resendCodeLink: {text: ref<string>(""), isTextCorrect: ref<boolean>(true), inputElement: null, errorMsgElement: ref()}
    };

    const headingFirstSentence = ref();

    const tStore = useTemporalStore();
    const sStore = useStatusStore();

    onMounted(() => {
        headingFirstSentence.value = (sStore.homePageViewsHierarchy[sStore.homePageViewsHierarchy.length - 1] === 'signin')? 'Now, we have sent you a verification code'
                                :    (sStore.homePageViewsHierarchy[sStore.homePageViewsHierarchy.length - 1] === 'login')? 'You have already got a verification code'
                                :    '';
        handleSendVerificationEmail(sStore.homePageViewsHierarchy[sStore.homePageViewsHierarchy.length - 1]);
    });

    async function handleSendVerificationEmail(redirectedFrom: string) {

        // If user comes from Login field, he should already have verification code in his inbox - no need to automatically send again
        if(redirectedFrom === 'login') { return; }
        
        await $fetch('/account/verify', {method: 'post', body: {
            accountData: {
                name: tStore.registeredUser_name,
                email: tStore.registeredUser_email,
            }
        }}).then((res) => {
            // Update temporal verification code to reduce db queries
            if(res) tStore.verificationCodeKey = res;
        })
    }

    async function handleRetryVerificationEmail() {
        const remainCooldownHours_local = tStore.calcRemainHoursCooldown(tStore.cooldown_start_verificationCode, new Date().getTime(), tStore.requiredElapseHours);

        // This is a local check that will be caught every time during the cooldown, preventing from multiple database calls meantime.
        // It stops working as soon as the cooldown ends, so that a new link can be sent again (via server) and now this local check
        // starts working again, etc.
        if(remainCooldownHours_local > 0) {
            if(verifyForm['resendCodeLink'].errorMsgElement) {
                verifyForm['resendCodeLink'].errorMsgElement.value.classList.replace('text-green-500', 'text-red-500');
                verifyForm['resendCodeLink'].errorMsgElement.value.textContent = `❌ Send limit exceeded! Try again in ${remainCooldownHours_local} hours.`;
            }
            return;
        }

        await $fetch('/account/verify', {method: 'put', body: {
            accountData: {
                email: tStore.registeredUser_email,
            },
            miscData: {
                requiredElapseHours: tStore.requiredElapseHours,
            }
        }}).then(res => {
            if(verifyForm['resendCodeLink'].errorMsgElement) {
                if(res && typeof res === 'string') {
                    verifyForm['resendCodeLink'].errorMsgElement.value.classList.replace('text-red-500', 'text-green-500')
                    verifyForm['resendCodeLink'].errorMsgElement.value.textContent = `✅ Verification link sent successfully! `;
                    // Update temporal verification code to reduce db queries
                    tStore.verificationCodeKey = res;
                    // Update temporal cooldown start (to prevent further db queries during the cooldown)
                    tStore.cooldown_start_verificationCode = BigInt(new Date().getTime());
                } 
                else if(typeof res === 'number') {
                    verifyForm['resendCodeLink'].errorMsgElement.value.classList.replace('text-green-500', 'text-red-500');
                    verifyForm['resendCodeLink'].errorMsgElement.value.textContent = `❌ Send limit exceeded! Try again in ${res} hours.`;
                }
            }
        });
    }

    function handleVerificationCodeCheck() {
        // First check if the verification code is not kept in temporal store (to reduce db queries)
        if(tStore.verificationCodeKey) { vCodeLocalCompare(); }
        else vCodeServerCompare();
    }

    function vCodeLocalCompare() {
        proceedValidation(Boolean(verifyForm.verificationCode.text.value.toString() === tStore.verificationCodeKey.toString()));
    }

    async function vCodeServerCompare() {
        await $fetch('/account/validate', {method: 'post', body: {
            accountData: {
                email: tStore.registeredUser_email,
                verifyCode_attempt: verifyForm.verificationCode.text.value.toString()
            }
        }}).then(res => proceedValidation(res));
    }

    async function proceedValidation(isVerificationOK: boolean) {
        if(!isVerificationOK) {
            verifyForm['verificationCode'].inputElement?.value.classList.add('border-b-red-500');
            if(verifyForm['verificationCode'].errorMsgElement) {
                verifyForm['verificationCode'].errorMsgElement.value.classList.remove('hidden');
                verifyForm['verificationCode'].errorMsgElement.value.textContent = `Incorrect verification code!`;
            } 
        } else {
            // Account verified ! Now user can be safely logged in and redirected to the main app page
            verifyForm['verificationCode'].inputElement?.value.classList.remove('border-b-red-500');
            verifyForm['verificationCode'].inputElement?.value.classList.add('border-b-green-500');
            if(verifyForm['verificationCode'].errorMsgElement) {
                verifyForm['verificationCode'].errorMsgElement.value.classList.replace('text-red-500', 'text-green-500');
                verifyForm['verificationCode'].errorMsgElement.value.classList.remove('hidden');
                verifyForm['verificationCode'].errorMsgElement.value.textContent = `Correct`;
            }
            
            await $fetch('/account/confirm', {method: 'post', body: {
                accountData: {
                    email: tStore.registeredUser_email
                }
            }});
            await navigateTo('/home');
            sStore.currentHomePageView = 'welcome';
            sStore.resetHomePageViewHierarchy();
        }
    }

</script>

<template>
    <section class="max-w-[95vw]
        sm:w-[90vw] sm:max-w-[675px]
        lg:w-[60vw] lg:max-w-[800px]"
    >
        <LandingComponentsFormClose />
        <h1 class="main-title text-5xl font-semibold font-mono text-center mb-7 pointer-events-none"> Verify <br class="sm:hidden"> account </h1>
        <h2 class="main-title-alt text-base font-mono text-center mt-4 mb-6
            lg:max-w-[80%] lg:mx-auto
        "> {{ headingFirstSentence }}. Please add it in the box below and press "Confirm". </h2>
        <form id="verify" name="verify" method="get" action="" class="mx-3" @submit.prevent="handleVerificationCodeCheck">
            <div class="my-4 mx-auto w-[90%] 
                sm:w-[60%]
                lg:w-[50%]
            ">
                <div :ref="verifyForm.verificationCode.inputElement" class="flex my-3 w-full outline-gray-500 bg-neutral-200 rounded-md shadow-[0.1rem_0.1rem_0.5rem_black] border-y-4 box-border">
                    <FontAwesomeIcon :icon="faSquareCheck" class="text-4xl text-[#222c] drop-icon mx-3 my-auto px-1"></FontAwesomeIcon>
                    <div class="relative w-full">
                        <input type="number" min="0" max="999999" aria-label="Write your verification code here" id="verify" name="verify" value="" v-model="verifyForm.verificationCode.text.value" placeholder="Verification code"
                            class="text-black text-base font-semibold text-center w-full py-4 px-2 outline-[#222c] bg-neutral-200 appearance-none cursor-text rounded-lg rounded-l-none border-l-2  border-[#222c] border-dashed" 
                        />
                        <span :ref="verifyForm.verificationCode.errorMsgElement" class="absolute bottom-0 left-0 text-red-500 font-bold text-xs w-full inline-block text-center" :class="verifyForm.verificationCode.isTextCorrect? 'hidden' : 'inline-block'"> Error: Some error occured </span>
                    </div>
                </div>
            </div>

            <span @click="handleRetryVerificationEmail()" class="main-title-alt text-sm underline font-semibold cursor-pointer mx-3
                sm:text-center sm:block
            "> 
                Send the code again
            </span>
            <span :ref="verifyForm.resendCodeLink.errorMsgElement" class=" text-red-500 font-bold text-xs w-full inline-block my-3 mx-3
                sm:text-center sm:mx-auto
            ">  </span>

            <button type="submit" class="mt-4 mb-4 py-5 px-10 w-fit max-w-[50vw] min-h-10 bg-[#111a] rounded-md mx-auto flex justify-center
                sm:mb-0
                lg:mb-2
            "> 
                <p class="main-title-alt text-xl text-center font-bold text-nowrap"> 
                    Confirm
                </p> 
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