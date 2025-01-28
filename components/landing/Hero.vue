<script setup lang="ts">
import json from '~/public/data/work.json'
const workData = ref(json)
const columns = workData.value.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
const firstImage = columns.length > 0 ? columns[0].image.src : '/workboys.jpg'
</script>

<template>
  <main class="w-full flex flex-row justify-center items-center">
    <div class="w-full max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 place-items-top gap-16 lg:gap-36">
      <div class="md:order-1 lg:col-span-2 h-auto block">
        <NuxtImg src="/header-main.jpg" alt="handyboys" class="w-full h-28 sm:h-36 md:h-48 lg:h-72 object-cover object-center" />
      </div>

      <div class="md:order-2">
        <h2 class="text-lg lg:text-2xl xl:text-3xl font-bold lg:tracking-tight">
          Vi fikser det meste!
        </h2>
        <p class="text-lg mt-1 max-w-xl">
          Vi er noen handy unge gutter som driver et firma hvor vi tilbyr små og store tjenester i Tønsberg/Nøtterøy området
        </p>
        <p class="mt-5">Vi tilbyr tjenester som:</p>

        <ul class="mt-5 list-disc pl-5">
          <li>Stubbefresing</li>
          <li>Bilvask</li>
          <li>Snømåking</li>
          <li>Gressklipp</li>
          <li>Flyttejobber</li>
          <li>Hagearbeid</li>
          <li>Kjøreoppdrag</li>
          <li>Faste avtaler</li>
          <li>m.m.</li>
        </ul>
        <p class="mt-5">Ta kontakt på tlf <NuxtLink to="tel:+4740193083" external class="font-bold">401 93 083</NuxtLink>
        </p>

        <div class="mt-6 flex flex-col sm:flex-row gap-3">
        </div>
      </div>
      <div class="md:order-3">
        <NuxtLink to="/gallery">
          <NuxtImg :src="firstImage" alt="handyboys" class="w-full rounded-xl shadow-lg" />
        </NuxtLink>
      </div>
    </div>
  </main>
</template>
