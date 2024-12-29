<script setup lang="ts">

if(process.server) {
  checkSessionStatus();
}

const { currentBreakpoint_set, currentBreakpoint_get } = useStatusStore();
const { isAdvancedMenuOpen } = storeToRefs(useStatusStore());

onBeforeMount(() => calculatePhotosLayout())

function calculatePhotosLayout() {
    const currentViewportWidth = document.documentElement.clientWidth;
    const updatedBreakpoint =  getCurrentBreakpointName(currentViewportWidth);
    if(updatedBreakpoint === currentBreakpoint_get()) return;
    currentBreakpoint_set(updatedBreakpoint);
}

window.addEventListener('resize', calculatePhotosLayout);

async function checkSessionStatus() {
  const { currentUser_set, isAuthenticated_get, isAuthenticated_set } = useAuthStore();

  const isSession = isAuthenticated_get();

  if(!isSession) {
    const data =  await $fetch('/account/getData', { method: 'post'});
    // In case session is active we should get back some data
    if(data) {
      isAuthenticated_set(true);
      currentUser_set(data.id, data.name, data.email, data.profile_image, data.member_since, data.likedPhotos as any, data.collections as any);
    }
  }
}

</script>

<template>
  <div :class="isAdvancedMenuOpen && `bg-zinc-200`">
    <NuxtLayout>
      <section class="max-w-[1320px] mx-auto">
        <NuxtPage />
      </section>
    </NuxtLayout>
  </div>
</template>
