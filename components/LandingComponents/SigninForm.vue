<script setup lang="ts">
    import { faCircleUser, faEnvelope, faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
    import { registerValidator } from '@/validators/formValidators';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    const registerForm = ref({
        username: "",
        email: "",
        password: "" 
    });
</script>

<template>
    <h1 class="main-title text-6xl font-semibold font-mono text-center mb-8"> Sign In </h1>
    <h2 class="main-title-alt text-xl font-mono text-center mt-4 mb-6"> New to 3PhotoLib? Please register first to use the service. </h2>
    <form id="signin" name="signin" method="post" action="" class="mx-3">
        <div class="my-4">
            <div class="flex my-3 w-full outline-gray-500 bg-neutral-200 rounded-md shadow-[0.1rem_0.1rem_0.5rem_black]">
                <FontAwesomeIcon :icon="faCircleUser" class="text-5xl text-[#222c] drop-icon my-auto mx-3 px-1"></FontAwesomeIcon>
                <input type="text" aria-label="Choose a username" id="username" name="username" value="" :model="registerForm.username" placeholder="Username..." 
                    class="text-black text-lg font-semibold text-center w-full py-5 px-2 outline-[#222c] bg-neutral-200 appearance-none cursor-pointer rounded-lg rounded-l-none border-l-2  border-[#222c] border-dashed" 
                />
            </div>
            <!-- <span class="text-red-400 text-sm main-title-alt"> Error: Some error occured </span> -->
        </div>

        <div class="my-4">
            <div class="flex my-3 w-full outline-gray-500 bg-neutral-200 rounded-md shadow-[0.1rem_0.1rem_0.5rem_black]">
                <FontAwesomeIcon :icon="faEnvelope" class="text-5xl text-[#222c] drop-icon my-auto mx-3 px-1"></FontAwesomeIcon>
                <input type="email" aria-label="Use an e-mail address" id="email" name="email" value="" :model="registerForm.email" placeholder="E-mail..."
                    class="text-black text-lg font-semibold text-center w-full py-5 px-2 outline-[#222c] bg-neutral-200 appearance-none cursor-pointer rounded-lg rounded-l-none border-l-2  border-[#222c] border-dashed" 
                />
            </div>
            <!-- <span class="text-red-400 text-sm main-title-alt"> Error: Some error occured </span> -->
        </div>

        <div class="my-4">
            <div class="flex my-3 w-full outline-gray-500 bg-neutral-200 rounded-md shadow-[0.1rem_0.1rem_0.5rem_black]">
                <FontAwesomeIcon :icon="faRectangleXmark" class="text-5xl text-[#222c] drop-icon my-auto mx-3 px-1"></FontAwesomeIcon>
                <input type="password" id="Set a password" name="password" value="" :model="registerForm.password" placeholder="Password..." 
                    class="text-black text-lg font-semibold text-center w-full py-5 px-2 outline-[#222c] bg-neutral-200 appearance-none cursor-pointer rounded-lg rounded-l-none border-l-2  border-[#222c] border-dashed" 
                />
            </div>
            <!-- <span class="text-red-400 text-sm main-title-alt"> Error: Some error occured </span> -->
        </div>

        <label class="flex ml-3">
            <input name="consent" aria-label="Consent" id="consent" type="checkbox" placeholder="" class="inline-block w-6 h-6 mr-3 cursor-pointer rounded-lg shadow-[0.1rem_0.1rem_0.5rem_black" />
            <span class="main-title-alt text-md">I've read and accept the <a class="underline font-semibold" target="_blank" href="#"> Terms of Service </a></span>
        </label>

        <div class="mt-8 mb-4  py-5 px-8 min-w-24 max-w-[40vw] min-h-10 bg-[#111a] rounded-full mx-auto flex justify-center"> 
            <button class="main-title-alt text-xl text-center font-bold text-nowrap"> Continue </button> 
        </div>
    </form>

    <!-- The code below will be set as a separate component -->
    <div class="grid grid-cols-2 grid-rows-1 mt-12">
        <div class="flex items-center justify-center -ml-4 -mb-8 py-6 border-r-4 border-t-4 bg-[#2227]  border-[#222c] border-double">
            <span class="main-title-alt text-lg"> SIGN-IN PAGE </span>
        </div>
        <div class="flex items-center justify-center -mr-4 -mb-8 py-6 border-l-2 border-t-2  border-[#222c] border-double">
            <span class="main-title-alt text-lg"> LOGIN PAGE </span>
        </div>
    </div>
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