<script setup lang="ts">

const [sStore, sqStore] = [useStatusStore(), useSearchQueryStore()];
const { isAuthenticated_get } = useAuthStore();

async function handleButtonClick() {

    // Reset the searchQuery store variables
    sqStore.$reset();

    const isUser = isAuthenticated_get();
    if(isUser) {
        // Session active - transfer to /home
        await navigateTo('/home');
    } else {
        // No session detected - show signin page
        sStore.setCurrentHomePageView('signin');
    }
}

</script>

<template>
    <h1 class="main-title text-6xl font-semibold font-mono text-center mt-8 mb-12"> 3PhotoLib </h1>
    <h2 class="main-title-alt text-xl font-mono text-center my-4"> The royalty-free photo delivery platform for free-forever use! </h2>
    <div class="mt-8 mb-4 min-w-24 max-w-[40vw] min-h-10 bg-[#111a] rounded-full mx-auto" @click="handleButtonClick"> 
        <p class="main-title-alt text-xl text-center py-5 px-8 font-bold text-nowrap"> Sign In </p> 
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

</style>