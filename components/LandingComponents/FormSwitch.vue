<script setup lang="ts">

    const sStore = useStatusStore();
    const {currentHomePageView } = storeToRefs(sStore);

</script>

<template>
    <div class="grid grid-cols-2 grid-rows-1 mt-12">
        <div class="flex items-center justify-center -ml-4 -mb-8 py-6 border-r-2 border-t-2 border-[#222c] border-double"
            @click="sStore.setCurrentHomePageView('signin')" :class="currentHomePageView === 'signin' && 'border-r-4 border-t-4 bg-[#2227]'"
        >
            <span class="main-title-alt text-lg font-semibold"> SIGN-IN PAGE </span>
        </div>
        <div class="flex items-center justify-center -mr-4 -mb-8 py-6 border-l-2 border-t-2  border-[#222c] border-double"
            @click="sStore.setCurrentHomePageView('login')" :class="currentHomePageView === 'login' && 'border-l-4 border-t-4 bg-[#2227]'"
        >
            <span class="main-title-alt text-lg"> LOGIN PAGE </span>
        </div>
    </div>
</template>

<style scoped>
    .main-title-alt {
        font-family: Montserrat, 'Arial Narrow Bold', sans-serif, Haettenschweiler;
        filter: drop-shadow(.12rem .12rem .1rem #000);
    }
</style>