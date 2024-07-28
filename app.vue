<script setup lang="ts">

if(process.server) {
  checkSessionStatus();
}

async function checkSessionStatus() {
  const { currentUser_get, currentUser_set, isAuthenticated_get, isAuthenticated_set } = useAuthStore();

  console.log('SERVER STATUS::: ON')

  const isSession = isAuthenticated_get();

  if(!isSession) {
    const data =  await $fetch('/account/getData', { method: 'post'});
    // In case session is active we should get back some data
    if(data) {
      isAuthenticated_set(true);
      currentUser_set(data.name, data.email, data.profile_image, data.member_since, [], []);
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
