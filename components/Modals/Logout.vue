<script setup lang="ts">

const { asyncProcess_get } = useStatusStore();
const { isAuthenticated_set, currentUser_clear } = useAuthStore();

const modalEmits = defineEmits(['modalClose']);

async function performUserLogout() {
    await $fetch('/account/logout', { method: 'post' });
    isAuthenticated_set(false);
    currentUser_clear();
    return navigateTo('/');
}

</script>

<template>
    <div @click.self="!asyncProcess_get() && modalEmits('modalClose')" class="h-screen w-full bg-[#222b] fixed top-0 left-0 z-10 backdrop-blur flex items-center justify-center overflow-auto">
        <section class="bg-[#eee] m-auto w-full h-fit px-3 py-6 rounded-md shadow-[0.3rem_0.3rem_0.5rem_#222] border-2 border-[#222] border-solid
            sm:max-w-[550px]
            lg:max-w-[660px]
        ">
            <h2 class="max-w-[80%] align-middle mx-auto text-4xl font-bold text-center py-6 mb-9 border-[#222] border-solid border-b-4"> Logout </h2>
            <div class="mx-3 my-9 text-center">
                <p class="text-lg inline-block font-semibold
                    sm:max-w-[330px]
                "> Are you sure you want to logout from this account? </p>

            </div>
            <div class="grid grid-cols-2 grid-rows-1 pt-3 gap-x-4
                sm:mx-6
            ">
                <button type="reset" @click.self="!asyncProcess_get() && modalEmits('modalClose')" class="font-normal text-lg border-2 border-black rounded-md py-4"> Cancel </button>
                <button type="submit" @click.self="!asyncProcess_get() && performUserLogout()" class="font-bold text-lg border-2 border-black bg-[#222d] text-neutral-100 rounded-md py-4"> Confirm </button>
            </div>
        </section>
    </div>
</template>

<style scoped>

</style>