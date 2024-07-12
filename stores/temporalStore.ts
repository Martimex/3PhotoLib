export const useTemporalStore = defineStore('temporalStore', () => {

    // The store is used for temporary values (that are updated just once and no more) for easier store access rather than prop drilling 
    
    // THIS VALUES WILL BE ONLY USED HERE AS A STORAGE (ARE FILLED UPON SUCCESSFUL REGISTRATION) AND REQUESTED JUST FOR SENDING THE VERIFY CODE THE FIRST TIME
    const [registeredUser_name, registeredUser_email] = [ref<string>(''), ref<string>('') ];

    // The values for keeping track for Login Page 
    const [loginUser_name, loginUser_email] = [ref<string>(''), ref<string>('')];

    // The current verification key - sorted here to lower the amount of unnecessary database calls (for local compare)
    const verificationCodeKey = ref<string>('');

    // This functionalities are useful for to prevent unnecessary database calls upon sending a link request during cooldown time
    const [ cooldown_start, requiredElapseHours ] = [ ref<bigint>(BigInt(0)), ref<12>(12) ];
    const calcRemainHoursCooldown = function(cooldown_start: bigint, time_now: number, requiredElapseHours: number) {
        return requiredElapseHours - Math.floor((time_now - Number(cooldown_start)) / (1000 * 60 * 60));
    }

    // This variable will help to determine whether the Verification component was brought to the user directly from Signin or LoginPage
    const verification_redirectedFrom = ref<'signin' | 'login'>('signin');


    return { registeredUser_name, registeredUser_email, loginUser_name, loginUser_email, verificationCodeKey, cooldown_start, requiredElapseHours, calcRemainHoursCooldown, verification_redirectedFrom }
});