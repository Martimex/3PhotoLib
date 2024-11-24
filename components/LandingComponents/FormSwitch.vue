<script setup lang="ts">

    const sStore = useStatusStore();
    const {currentHomePageView } = storeToRefs(sStore);

</script>

<template>
    <div class="grid grid-cols-2 grid-rows-1 mt-12 -mb-8 -mx-10
        sm:mt-0 sm:mb-6 sm:ml-3 sm:mx-0
        lg:mt-0 lg:mb-9
    ">
        <div @click="sStore.setCurrentHomePageView('signin')" :class="currentHomePageView === 'signin' && 'border-r-4 border-t-4 bg-[#2227]'"
            class="flex items-center justify-center  py-4 border-2 border-b-0 border-[#222c] border-double hover:cursor-pointer
                sm:border-b-2
            ">
            <span class="main-title-alt text-base font-semibold
                sm:text-sm
                lg:text-base
            "> SIGN-IN PAGE </span>
        </div>
        <div @click="sStore.setCurrentHomePageView('login')" :class="currentHomePageView === 'login' && 'border-l-4 border-t-4 bg-[#2227]'"
            class="flex items-center justify-center  py-4  border-2 border-b-0 border-[#222c] border-double hover:cursor-pointer
                sm:border-b-2
            ">
            <span class="main-title-alt text-base
                sm:text-sm
                lg:text-base
            "> LOGIN PAGE </span>
        </div>
    </div>
</template>

<style scoped>
    .main-title-alt {
        font-family: Montserrat, 'Arial Narrow Bold', sans-serif, Haettenschweiler;
        filter: drop-shadow(.12rem .12rem .1rem #000);
    }
</style>