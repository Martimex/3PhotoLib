<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { useStatusStore } from '@/stores/statusStore';

import SearchBar from './SearchBar.vue';
import AdvancedMenu from './AdvancedMenu.vue';

const sStore = useStatusStore();
const { isAdvancedMenuOpen } = storeToRefs(useStatusStore());

const navBarContainerRef = ref();

const applyBackgroundColor = computed(() => isAdvancedMenuOpen.value? `bg-gray-200` : `bg-[#fff5]`)

onMounted(() => {
    
})

defineExpose({
    navBarContainerRef: navBarContainerRef
})

</script>


<template>
    <nav ref="navBarContainerRef" class="sticky z-10 top-0 left-0 right-0 backdrop-blur text-[#333] py-5" :class="applyBackgroundColor">
        <div v-if="!sStore.isSearchbarOpen" class="px-6 flex self-start justify-between items-center w-full">
            <NuxtLink to="/home"> <span class="text-4xl text-[#111] drop-shadow-[0rem_0rem_0.05rem_#eee] font-light align-middle "> 3PhotoLib </span> </NuxtLink>
            <NuxtLink to="/home/account" class="w-fit">
                <FontAwesomeIcon :icon="faCircleUser" class="text-4xl text-[#333] drop-shadow-[0rem_0rem_0.05rem_#eee]" @click=""></FontAwesomeIcon>
            </NuxtLink>
        </div>

        <div v-if="sStore.isSearchbarOpen" class="px-6 grid grid-cols-[1fr_auto_1fr] place-items-center">
            <!-- Adding component instead of "inline DOM", because we want to make use of onMounted() call -->
            <SearchBar />
        </div>

        <div v-if="sStore.isSearchbarOpen && sStore.isAdvancedMenuOpen" class="relative">
            <AdvancedMenu />
        </div>
    </nav>
</template>


<style scoped>

</style>