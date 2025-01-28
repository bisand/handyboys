<script setup>
definePageMeta({
  layout: "landing",
});

const TeamImg1 = "https://source.unsplash.com/IF9TK5Uy-KI";
const TeamImg2 = "https://source.unsplash.com/iEEBWgY_6lA";
const TeamImg3 = "https://source.unsplash.com/ZHvM3XIOHoE";

const team = [
  // {
  //   name: "Janette Lynch",
  //   title: "Senior Director",
  //   avatar: {
  //     src: TeamImg1,
  //     width: 480,
  //     height: 560,
  //   },
  // },
  // {
  //   name: "Marcell Ziemann",
  //   title: "Principal Strategist",
  //   avatar: {
  //     src: TeamImg2,
  //     width: 580,
  //     height: 580,
  //   },
  // },
  // {
  //   name: "Robert Palmer",
  //   title: "Marketing Engineer",
  //   avatar: {
  //     src: TeamImg3,
  //     width: 580,
  //     height: 580,
  //   },
  // },
];
</script>

<template>
  <LandingContainer class="mt-32 px-10">
    <LandingSectionhead>
      <template v-slot:title>Om oss</template>
      <template v-slot:desc>Små og store oppgaver? Vi fikser det!</template>
    </LandingSectionhead>

    <div class="flex flex-col gap-3 mx-auto max-w-4xl mt-8">
      <p>
        Vi er et ungt og energisk team med lidenskap for praktiske oppgaver og fornøyde kunder.
        Vi holder til i Tønsberg/Nøtterøy-området og tilbyr et bredt spekter av tjenester – fra små jobber til større oppdrag.
        Uansett hva du trenger hjelp med, står vi klare til å gjøre hverdagen din litt enklere.
      </p>
      <p class="mt-5">Våre tjenester inkluderer blant annet:</p>
      <ul class="list-disc pl-5">
        <li>Stubbefresing</li>
        <li>Bilvask</li>
        <li>Snømåking</li>
        <li>Gressklipping</li>
        <li>Flyttejobber</li>
        <li>Hagearbeid</li>
        <li>Kjøreoppdrag</li>
        <li>Faste avtaler</li>
      </ul>
      <p><NuxtLink to="/gallery">Og mye mer!</NuxtLink></p>
      <p class="mt-5">
        Vi er opptatt av å levere kvalitetsarbeid, og vår fleksibilitet gjør at vi kan skreddersy løsninger etter dine behov.
        Ta gjerne kontakt med oss på telefon for en hyggelig prat og et uforpliktende tilbud.
      </p>
      <p class="contact">Vi gleder oss til å <NuxtLink to="/contact">høre fra deg!</NuxtLink></p>
      <p></p>
    </div>
    <div class="grid md:grid-cols-3 gap-10 mx-auto max-w-4xl mt-12">
      <div v-for="item of team" class="group">
        <div class="w-full aspect-square">
          <img :src="item.avatar.src" :width="item.avatar.width" :height="item.avatar.height" format="avif" alt="Team"
            class="w-full h-full object-cover rounded transition group-hover:-translate-y-1 group-hover:shadow-xl" />
        </div>

        <div class="mt-4 text-center">
          <h2 class="text-lg text-gray-800">{{ item.name }}</h2>
          <h3 class="text-sm text-slate-500">{{ item.title }}</h3>
        </div>
      </div>
      <!-- {
        team.map((item) => (
          <div class="group">
            <div class="w-full aspect-square">
              <Image
                {...item.avatar}
                format="avif"
                alt="Team"
                class="w-full h-full object-cover rounded transition  group-hover:-translate-y-1 group-hover:shadow-xl"
              />
            </div>

            <div class="mt-4 text-center">
              <h2 class="text-lg text-gray-800"> {item.name}</h2>
              <h3 class="text-sm text-slate-500"> {item.title}</h3>
            </div>
          </div>
        ))
      } -->
    </div>
  </LandingContainer>
</template>
