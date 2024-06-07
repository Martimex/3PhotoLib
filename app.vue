<script setup lang="ts">
  import { createClient } from '@supabase/supabase-js';
  const database = createClient(import.meta.env.VITE_DATABASE_URL_SHORT, import.meta.env.VITE_DATABASE_ANON_KEY)
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
