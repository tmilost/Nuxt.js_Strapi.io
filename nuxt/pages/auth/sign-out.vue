<!-- ./pages/sign-out.vue -->

<script setup>
onMounted(() => {
  // set session to null
  useSetSession(null);

  setTimeout(() => {
    navigateTo("/");
  }, 1000);
});
</script>
<template>
  <main class="site-main sign-out-main">
    <div class="wrapper">
      <h3 class="text-3xl">Signing Out...</h3>
    </div>
  </main>
</template>