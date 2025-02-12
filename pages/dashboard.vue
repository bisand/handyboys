<script lang="ts" setup>
definePageMeta({
  layout: "landing",
  middleware: ['auth-logged-in'],
})
const { data } = await useFetch('/api/hello')
</script>

<template>
  <LandingContainer class="mt-32 p-8 flex flex-col items-center space-y-8">
    <div class="w-full max-w-screen-xl flex flex-col justify-center items-center">
      <NuxtLink to="/work" class="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded-lg text-center text-xl">
        Arbeidsliste
      </NuxtLink>
      <!-- Additional buttons can be added below -->
      <!-- Example button:
    <NuxtLink
      to="/noe-annet"
      class="w-full max-w-screen-xl bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-8 rounded-lg text-center text-xl"
    >
      Enkel Tittel
    </NuxtLink>
    -->
      <pre class="mt-4">{{ data }}</pre>
    </div>
  </LandingContainer>
</template>

<style></style>