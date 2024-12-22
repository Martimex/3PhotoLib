<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { useStatusStore } from '@/stores/statusStore';

import SearchBar from './SearchBar.vue';
import AdvancedMenu from './AdvancedMenu.vue';
import { getNavbarStyleClasses } from '~/utils/getNavbarStyleClasses';

import { NavbarPosition } from '~/types/type_utilities';
import { responsiveLayoutData } from '../utils/getResponsiveLayoutData';

const sStore = useStatusStore();
const { isAdvancedMenuOpen, currentBreakpoint } = storeToRefs(useStatusStore());

const navBarContainerRef = ref();

const applyBackgroundColor = computed(() => isAdvancedMenuOpen.value && `bg-gray-200`);


defineExpose({
    navBarContainerRef: navBarContainerRef
})

</script>


<template>
    <nav ref="navBarContainerRef" class="sticky z-10 grid grid-rows-1 grid-cols-1" :class="[applyBackgroundColor, getNavbarStyleClasses(NavbarPosition.TOP)]">
        <div :class="sStore.isSearchbarOpen && `invisible pointer-events-none`" class="stack-effect px-6 grid grid-cols-3 items-center w-full">
            <NuxtLink to="/home"> <span class="text-4xl text-[#111] drop-shadow-[0rem_0rem_0.05rem_#eee] font-light align-middle "> 3PhotoLib </span> </NuxtLink>
            <div class="justify-self-center w-full" id="top-panel-teleport">
                <!-- THE #top-panel-teleport DIV IS A TELEPORT TARGET. DO NOT CHANGE THE CLASSNAME AND DO NOT REMOVE THIS ELEMENT -->
            </div>
            <NuxtLink to="/home/account" class="w-fit justify-self-end">
                <FontAwesomeIcon :icon="faCircleUser" class="text-4xl text-[#333] drop-shadow-[0rem_0rem_0.05rem_#eee]" @click=""></FontAwesomeIcon>
            </NuxtLink>
        </div>

        <div v-if="sStore.isSearchbarOpen" class="stack-effect px-6 grid grid-cols-[1fr_auto_auto_1fr] place-items-center">
            <!-- Adding component instead of "inline DOM", because we want to make use of onMounted() call -->
            <SearchBar />
        </div>

        <div v-if="sStore.isSearchbarOpen && sStore.isAdvancedMenuOpen" class="relative">
            <AdvancedMenu />
        </div>
    </nav>
</template>


<style scoped>
    .stack-effect {
        grid-area: 1 / 1 / 2 / 2;
    }

</style>