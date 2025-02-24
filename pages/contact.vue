<script setup>
definePageMeta({
  layout: "landing",
});

const contactFormSubmitted = ref(false);
const contactDetails = ref({});

const contactSuccess = (data) => {
  console.log(data);
  contactDetails.value = data.data;
  contactFormSubmitted.value = true;
};

const contactError = (error) => {
  console.error(error);
};
</script>

<template>
  <LandingContainer class="mt-32 px-10">
    <LandingSectionhead>
      <template v-slot:title>Kontakt</template>
      <template v-slot:desc>Vi er her for å hjelpe til.</template>
    </LandingSectionhead>

    <div class="grid md:grid-cols-2 gap-10 mx-auto max-w-4xl mt-16">
      <div>
        <h2 class="font-medium text-2xl">
          Kontakt HandyBoys
        </h2>
        <p class="text-lg leading-relaxed mt-3">
          Har du spørsmål. Fyll ut skjemaet, <br>eller send oss en e-post.
        </p>
        <div class="mt-5">
          <div class="flex items-center mt-2 space-x-2">
            <Icon class="text-gray-400 w-4 h-4" name="uil:map-marker" />
            <NuxtLink to="https://www.google.com/maps/place/Haug%C3%A5kerveien+11B,+3132+Hus%C3%B8ysund/" target="_blank" external>Tønsberg</NuxtLink>
          </div>
          <div class="flex items-center mt-2 space-x-2">
            <Icon class="text-gray-400 w-4 h-4" name="uil:envelope" /><NuxtLink to="mailto:HandyBoys AS<post@handyboys.no>?subject=Jeg trenger hjelp til" external>post@handyboys.no</NuxtLink>
          </div>
          <div class="flex items-center mt-2 space-x-2 text-gray-600">
            <Icon class="text-gray-400 w-4 h-4" name="uil:phone" /><NuxtLink to="tel:+4740193083" external>401 93 083</NuxtLink>
          </div>
        </div>
      </div>
      <div>
        <LandingContactform v-if="!contactFormSubmitted" @success="contactSuccess" @error="contactError" />
        <LandingContactConfirmation v-if="contactFormSubmitted" :contactDetails="contactDetails" />
      </div>
    </div>
  </LandingContainer>
</template>
