<script setup>
import json from "~/public/data/work.json";

const workData = ref(json);

definePageMeta({
  layout: "landing",
});


const columns = workData.value.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
// console.log(columns)

</script>

<template>
  <LandingContainer class="w-full flex flex-row justify-center items-center mt-32 px-10">
    <div class="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="item in columns" :key="item.image.src" class="grid gap-4">
        <NuxtLink :to="`/workitem/${item.id}`">
          <NuxtImg class="h-auto max-w-full rounded-lg shadow-lg" :src="item.image.src" :alt="item.title" />
        </NuxtLink>
      </div>
    </div>
  </LandingContainer>
</template>
