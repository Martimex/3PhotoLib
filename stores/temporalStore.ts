export const useTemporalStore = defineStore('temporalStore', () => {

    // The store is used for temporary values (that are updated just once and no more) for easier store access rather than prop drilling 
    
    // THIS VALUES WILL BE ONLY USED HERE AS A STORAGE (ARE FILLED UPON SUCCESSFUL REGISTRATION) AND REQUESTED JUST FOR SENDING THE VERIFY CODE THE FIRST TIME
    const [registeredUser_name, registeredUser_email] = [ref<string>(''), ref<string>('') ];

    // This value is used in case user proceeds to reset password - we only need to store the respective, beforehand validataed e-mail address
    const resetPassword_email = ref<string>('');

    // Determines if reset password mail was automatically sent (this happens if time elapsed is more than 12 hours)
    const isResetPasswordMailSent = ref<boolean>(true);

    // The values to keep input text even when switching between Signin and Login Components
    const inputsText: {[key: string]: any}  = {
        signin: { username: ref(''), email: ref(''), password: ref('') },
        login: { email: ref(''), password: ref('') },
    };

    function clearInputsText(iText: any) {
        // NOTE: THIS DOES NOT REMOVE INPUT VALUES FOR THE INPUTS WHOSE COMPONENT GOT CLOSED BY A TOP-RIGHT BUTTON
        const inputsText_keys = Object.keys(iText);
        for(let i=0; i<inputsText_keys.length; i++) {
            const subTree = Object.keys(inputsText[inputsText_keys[i]]);
            for(const prop of subTree) {
                inputsText[inputsText_keys[i]][prop].value = '';
            }
        }
    }

    // The current verification key - sorted here to lower the amount of unnecessary database calls (for local compare)
    const verificationCodeKey = ref<string>('');

    // This functionalities are useful for to prevent unnecessary database calls upon sending a link request during cooldown time
    const [ cooldown_start_verificationCode, cooldown_start_passwordReset, requiredElapseHours ] = [ ref<bigint>(BigInt(0)), ref<bigint>(BigInt(0)), ref<12>(12) ];
    const calcRemainHoursCooldown = function(cooldown_start: bigint, time_now: number, requiredElapseHours: number) {
        return requiredElapseHours - Math.floor((time_now - Number(cooldown_start)) / (1000 * 60 * 60));
    }

    return { registeredUser_name, registeredUser_email, resetPassword_email, isResetPasswordMailSent, inputsText, verificationCodeKey, cooldown_start_verificationCode, cooldown_start_passwordReset, requiredElapseHours, calcRemainHoursCooldown, clearInputsText }
});