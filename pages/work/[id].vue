<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

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

const work = ref<Work | null>(null)
const route = useRoute()
const workId = route.params.id as string

const { data, error } = await useFetch(`/api/work/${workId}`)
if (error.value) {
  console.error('Error fetching work:', error.value)
} else {
  work.value = data.value
}

onMounted(() => {
})
</script>

<template>
  <LandingContainer class="mt-32 p-8 flex flex-col items-center space-y-8">
    <div v-if="work" class="w-full max-w-screen-xl block p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
      <h1 class="text-3xl font-bold mb-6">{{ work.name }}</h1>
      <p class="text-gray-600 dark:text-gray-300 mb-2">
        <strong>Email:</strong> {{ work.email }}
      </p>
      <p class="text-gray-600 dark:text-gray-300 mb-2">
        <strong>Phone:</strong> {{ work.phone_number }}
      </p>
      <p class="text-gray-600 dark:text-gray-300 mb-2">
        <strong>Business:</strong> {{ work.business_type }}
      </p>
      <p class="text-gray-600 dark:text-gray-300 mb-2">
        <strong>Address:</strong> {{ work.address }}
      </p>
      <p class="text-gray-600 dark:text-gray-300 mb-2">
        <strong>Message:</strong> {{ work.message }}
      </p>
      <div v-if="work._attachments && Object.keys(work._attachments).length" class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="(attName, index) in Object.keys(work._attachments)" :key="index">
          <img :src="`/api/work/${work._id}/attachment/${attName}`" alt="Work attachment" class="max-w-xs rounded" />
        </div>
      </div>    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </LandingContainer>
</template>

<style>
/* Additional styling if required */
</style>