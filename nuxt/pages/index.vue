<!-- ./pages/index.vue -->

<script setup>
import { RefreshIcon } from "@heroicons/vue/outline";

const session = useSession();
const user = useUser();

</script>

<template>
  <main class="site-main home-main">
    <div class="wrapper">
      <header>
        <h1 class="text-4xl font-bold">Hey, {{ user?.username || "0_0" }}</h1>
      </header>
      <div class="content-wrapper">
        <aside class="create-post-aside">
          <div class="wrapper">
            <!-- Render editor if session is not pending -->
            <div v-if="!session.pending" class="editor-con">
              <Editor v-if="user?.email" />
              <div v-else class="unauthenticated-message px-2">
                <p>Sorry, you have to sign in</p>
              </div>
            </div>
            <div v-if="session.pending" :class="{ 'loading-state': session.pending }">
              <RefreshIcon class="icon stroke animate-rotate" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home-main .content-wrapper {
  @apply grid sm:grid-cols-7 gap-4 py-8;
}
.posts-section {
  @apply sm:col-span-4 sm:row-start-1;
}

.posts {
  @apply flex gap-4 flex-col;
}

.create-post-aside {
  @apply sm:col-span-7 sm:col-start-1 h-full;
}
.create-post-aside .wrapper {
  @apply sticky top-[4.5rem] h-min;
}
</style>
