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
    <section class="min-w-[80vw]
        sm:min-w-fit sm:max-w-[50vw] 
    ">
        <h1 class="main-title text-5xl font-semibold font-mono text-center my-6
            lg:text-6xl
        "> 
            3PhotoLib 
        </h1>
        <h2 class="main-title-alt text-lg font-mono text-center mt-9 mb-3 mx-[8%]
            lg:text-xl
        "> The royalty-free photo delivery platform for free-forever use! </h2>
        <div class="mt-8 mb-4 py-5 px-10 w-fit max-w-[50vw] min-h-10 bg-[#111a] rounded-md mx-auto  hover:cursor-pointer" @click="handleButtonClick"> 
            <p class="main-title-alt text-lg text-center font-bold text-nowrap
                lg:text-xl
            "> Sign In </p> 
        </div>
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

</style>