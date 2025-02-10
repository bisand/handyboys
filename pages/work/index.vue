<script lang="ts" setup>

definePageMeta({
  layout: "landing",
})

interface Attachment {
  content_type: string
  revpos: number
  digest: string
  length: number
  stub: boolean
}

interface Work {
  _id: string
  _rev: string
  doc_type_: string
  name: string
  email: string
  phone_number: string
  business_type: string
  address: string
  message: string
  status: string
  _attachments: Record<string, Attachment>
}

interface WorkData {
  docs: Work[]
  bookmark: string
}

const works = ref<Work[]>([])

const { data, error } = await useFetch('/api/work')

if (error.value) {
  console.error('Error fetching works:', error.value)
} else if (data.value) {
  works.value = data.value.docs
}

</script>

<template>
  <LandingContainer class="mt-32 flex items-center justify-center px-10">
    <div class="w-full max-w-screen-xl flex flex-col justify-center items-center">
      <ul class="w-full space-y-6">
        <li v-for="work in works" :key="work._id">
          <NuxtLink :to="`/work/${work._id}`"
            class="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {{ work.name }}
            </h2>
            <p class="text-gray-600 dark:text-gray-300">
              <strong>Email:</strong> {{ work.email }}
            </p>
            <p class="text-gray-600 dark:text-gray-300">
              <strong>Phone:</strong> {{ work.phone_number }}
            </p>
            <p class="text-gray-600 dark:text-gray-300">
              <strong>Business:</strong> {{ work.business_type }}
            </p>
            <p class="text-gray-600 dark:text-gray-300">
              <strong>Address:</strong> {{ work.address }}
            </p>
            <p class="text-gray-600 dark:text-gray-300">
              <strong>Message:</strong> {{ work.message }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </LandingContainer>
</template>

<style>
/* Additional styling if required */
</style>