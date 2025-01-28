<script setup>
import { NuxtImg } from '#components';

const menuitems = [
  {
    title: "Hjem",
    path: "/",
    reqireAuth: false,
    external: false,
    icon: "bx:bxs-home",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    reqireAuth: true,
    external: false,
    icon: "bx:bxs-dashboard",
  },
  {
    title: "Facebook",
    path: "https://www.facebook.com/people/HandyBoys-As/61555536392249/",
    reqireAuth: false,
    external: true,
    icon: "bx:bxl-facebook",
  },
  {
    title: "Kontakt",
    path: "/contact",
    reqireAuth: false,
    external: false,
    icon: "bx:bxs-envelope",
  },
  {
    title: "Om oss",
    path: "/about",
    reqireAuth: false,
    external: false,
    icon: "bx:bxs-info-circle",
  },
];

const client = useKindeClient();
const auth = useAuth();
const open = ref(false);
</script>

<template>
  <LandingContainer class="">
    <header
      class="w-full flex flex-row justify-center items-center bg-stone-100 bg-opacity-50 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 fixed top-0 z-50">
      <div class="w-full max-w-screen-xl flex flex-col lg:flex-row justify-between items-center pt-2 pb-1 px-10">
        <div class="flex w-full lg:w-auto items-center justify-between">
          <a href="/" class="text-4xl flex flex-row items-baseline">
            <NuxtImg src="/handyboys-red.svg" alt="handyboys" width="128" height="128" />
          </a>
          <div class="block lg:hidden">
            <button @click="open = !open" class="text-gray-800 dark:text-gray-400">
              <svg fill="currentColor" class="w-4 h-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path v-show="open" fill-rule="evenodd" clip-rule="evenodd"
                  d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z">
                </path>
                <path v-show="!open" fill-rule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"></path>
              </svg>
            </button>
          </div>
        </div>
        <nav class="w-full lg:w-auto mt-2 lg:flex lg:mt-0" :class="{ block: open, hidden: !open }">
          <ul class="flex flex-col lg:flex-row lg:gap-3">
            <li v-for="item of menuitems">
              <NuxtLink v-if="!item.reqireAuth || item.reqireAuth && auth.loggedIn" :href="item.path" @click="open = !open" :external="item.external"
                :target="item.external ? '_blank' : '_self'"
                class="flex items-center lg:px-3 py-2 font-bold text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50">
                <Icon v-if="item.icon" class="mr-2 text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50" :name="item.icon" />
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
          <div class="lg:hidden flex items-center mt-3 gap-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50">
            <ColorModeButton />
            <LandingLink v-if="!auth.loggedIn" href="/api/login" block size="md" external>Logg inn</LandingLink>
            <LandingLink v-if="auth.loggedIn" href="/api/logout" block size="md" external>Logg ut</LandingLink>
          </div>
        </nav>
        <div>
          <div class="hidden lg:flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50">
            <ColorModeButton />
            <LandingLink v-if="!auth.loggedIn" href="/api/login" external>Logg inn</LandingLink>
            <LandingLink v-if="auth.loggedIn" href="/api/logout" external>Logg ut</LandingLink>
          </div>
        </div>
      </div>
    </header>
  </LandingContainer>
</template>
