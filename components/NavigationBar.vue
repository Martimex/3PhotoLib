<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useStatusStore } from '@/stores/statusStore';

import SearchBar from './SearchBar.vue';
import AdvancedMenu from './AdvancedMenu.vue';

const sStore = useStatusStore();
const { isAuthenticated_set, currentUser_clear } = useAuthStore();

const handleUserLogout = async function() {
    // This function will be invoked by some other UI piece, but for now to prepare a complete user session flow, the feature is added here.
    await $fetch('account/logout', { method : 'post' });
    currentUser_clear();
    isAuthenticated_set(false);
    return navigateTo('/');
}

</script>


<template>
    <nav class="sticky z-10 top-0 left-0 right-0 text-black py-7 bg-gray-200">
        <div v-if="!sStore.isSearchbarOpen" class="px-6 flex self-start justify-between items-center w-full">
            <NuxtLink to="/"> <span class="text-4xl font-bold align-middle"> 3PhotoLib </span> </NuxtLink>
            <FontAwesomeIcon :icon="faCircleUser" class="text-4xl text-gray-400" @click="handleUserLogout"></FontAwesomeIcon>
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