<script lang="ts" setup>

definePageMeta({
  title: 'Referanser',
  description: 'Referanser fra fornøyde kunder',
  image: '/images/work/20240520-1.jpg',
  url: 'https://handyboys.no/references',
  twitter: {
    card: 'summary_large_image',
    site: '@handyboys',
    title: 'Referanser',
    description: 'Referanser fra fornøyde kunder',
    image: '/images/work/20240520-1.jpg',
  },
  og: {
    title: 'Referanser',
    description: 'Referanser fra fornøyde kunder',
    image: '/images/work/20240520-1.jpg',
    type: 'website',
  },
  layout: 'landing',
})

const data = ref([
  {
    id: 1,
    title: 'Referanse 1',
    name: 'Karin Syvertsen',
    image: '',
    date: '2025-01-06',
    description: 'Dette er høflige, flinke og imøtekommende gutter som står på og jobber hardt for å ivareta kundens interesser. Mitt inntrykk er at de strekker seg langt for å kunne oppfylle kravene til arbeidet med en positiv og velvillig innstilling, så langt det lar seg gjøre.',
  },
])
</script>

<template>
  <LandingContainer class="w-full flex flex-row justify-center items-center mt-32 px-10">
    <div class="w-full max-w-screen-xl flex flex-col justify-center items-center">
      <h1 class="mb-10 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Referanser fra fornøyde kunder</h1>
      <div v-for="item in data" class="mt-8 flex items-start gap-2.5">
        <img class="w-8 h-8 rounded-full" :src="`https://xsgames.co/randomusers/assets/avatars/pixel/${item.id}.jpg`" alt="Jese image">
        <div class="flex flex-col gap-1 w-full max-w-[520px]">
          <div class="flex items-center space-x-2 rtl:space-x-reverse">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ item.name }}</span>
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ item.date }}</span>
          </div>
          <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <p class="text-sm font-normal text-gray-900 dark:text-white">{{ item.description }}</p>
          </div>
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
        </div>
      </div>
    </div>
  </LandingContainer>
</template>

<style></style>