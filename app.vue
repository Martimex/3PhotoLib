<script setup lang="ts">
import { sortById } from './utils/sortById';

if(process.server) {
  checkSessionStatus();
}

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
  <div>
    <NuxtLayout>
      <section class="max-w-[1320px] mx-auto">
        <NuxtPage />
      </section>
    </NuxtLayout>
  </div>
</template>
