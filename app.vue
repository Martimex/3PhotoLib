<script setup lang="ts">
import { sortById } from './utils/sortById';

if(process.server) {
  checkSessionStatus();
}

async function checkSessionStatus() {
  const { currentUser_get, currentUser_set, isAuthenticated_get, isAuthenticated_set } = useAuthStore();

  console.log('SERVER STATUS::: ON');

  const isSession = isAuthenticated_get();

  if(!isSession) {
    const data =  await $fetch('/account/getData', { method: 'post'});
    // In case session is active we should get back some data
    if(data) {
      isAuthenticated_set(true);
      currentUser_set(data.id, data.name, data.email, data.profile_image, data.member_since, data.likedPhotos, data.collections);
    }
  }
}

</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
