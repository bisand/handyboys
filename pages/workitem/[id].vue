<script lang="ts" setup>
import json from '~/public/data/work.json'
const route = useRoute()

definePageMeta({
  layout: "landing",
});

const workData = ref(json)
const workItem = computed(() => workData.value.find((item) => item.id.toString() === route.params.id))
</script>

<template>
  <div>
    <LandingContainer class="w-full flex flex-row justify-center items-center mt-32 px-10">
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <NuxtLink href="/gallery">
          <NuxtImg class="rounded-t-lg" :src="workItem?.image.src" alt="" />
        </NuxtLink>
        <div class="p-5">
          <NuxtLink href="/gallery">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ workItem?.title }}</h5>
          </NuxtLink>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ workItem?.description }}</p>
        </div>
      </div>
    </LandingContainer>
  </div>
</template>

<style></style>