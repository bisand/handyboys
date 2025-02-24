<script lang="ts" setup>
const props = defineProps<{
  contactDetails: {
      name: string;
      email: string;
      phone_number: string;
      business_type: string;
      address: string;
      message: string;
  };
}>();
</script>

<template>
  <div class="bg-white text-gray-800 shadow-lg rounded-lg p-6 dark:bg-gray-800 dark:text-white">
    <h2 class="text-2xl font-medium text-center">Takk for din henvendelse</h2>
    <p class="text-center mt-3">Vi vil ta kontakt med deg så snart som mulig.</p>
    <h3 class="mt-10 mb-5 col-span-2 font-medium text-xl text-center">Registrert informasjon</h3>
    <div class="grid grid-cols-2 gap-4">
      <p class="text-right text-gray-500 dark:text-gray-400">Navn:</p>
      <p class="italic">{{ props.contactDetails.name }}</p>
      <p class="text-right text-gray-500 dark:text-gray-400">Adresse:</p>
      <p class="italic">{{ props.contactDetails.address }}</p>
      <p class="text-right text-gray-500 dark:text-gray-400">Virksomhetstype:</p>
      <p class="italic">{{ props.contactDetails.business_type }}</p>
      <p class="text-right text-gray-500 dark:text-gray-400">Telefonnummer:</p>
      <p class="italic">{{ props.contactDetails.phone_number }}</p>
      <p class="text-right text-gray-500 dark:text-gray-400">E-post:</p>
      <p class="italic">{{ props.contactDetails.email }}</p>
      <p class="text-right text-gray-500 dark:text-gray-400">Melding:</p>
      <p class="italic">{{ props.contactDetails.message }}</p>
    </div>
  </div>
</template>

<style></style>