<script setup>
import { NuxtImg } from '#components';
import path from 'path';

const menuitems = [
  {
    title: "Hjem",
    path: "/",
    reqireAuth: false,
    external: false,
    icon: "bx:bxs-home",
  },
  // {
  //   title: "Dashboard",
  //   path: "/dashboard",
  //   reqireAuth: true,
  //   external: false,
  //   icon: "bx:bxs-dashboard",
  // },
  {
    title: "Galleri",
    path: "/gallery",
    reqireAuth: false,
    external: false,
    icon: "bx:bxs-image",
  },
  {
    title: "Facebook",
    path: "https://www.facebook.com/people/HandyBoys-As/61555536392249/",
    reqireAuth: false,
    external: true,
    icon: "bx:bxl-facebook",
  },
  {
    title: "Referanser",
    path: "/references",
    reqireAuth: false,
    external: false,
    icon: "bx:bxs-book",
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
const menuRef = ref(null)

const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})


</script>

<template>
  <LandingContainer class="">
    <header
      class="w-full flex flex-row text-xs lg:text-base justify-center items-center bg-stone-100 dark:bg-[#262626] bg-opacity-50 dark:bg-opacity-40 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 fixed top-0 z-50 shadow-lg transition-all whitespace-nowrap">
      <div ref="menuRef" class="w-full max-w-screen-xl flex flex-col md:flex-row justify-between items-center pt-2 pb-1 px-10">
        <div class="flex w-full md:w-auto items-center justify-between">
          <NuxtLink href="/" class="min-w-24 w-32 text-4xl flex flex-row items-baseline" external>
            <NuxtImg src="/handyboys-red.svg" alt="handyboys" />
          </NuxtLink>
          <div class="block md:hidden">
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
        <nav class="w-full md:w-auto mt-2 md:flex md:mt-0" :class="{ block: open, hidden: !open }">
          <ul class="flex flex-col md:flex-row md:gap-3">
            <li v-for="item of menuitems">
              <NuxtLink v-if="!item.reqireAuth || item.reqireAuth && auth.loggedIn" :href="item.path" @click="open = open ? !open : open" :external="item.external"
                :target="item.external ? '_blank' : '_self'"
                class="flex items-center md:px-3 py-2 font-bold text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50">
                <Icon v-if="item.icon" class="mr-2 text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50" :name="item.icon" />
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
          <div class="md:hidden flex items-center mt-3 gap-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50">
            <ColorModeButton />
            <UserContextMenu v-if="open" />
            <!-- <LandingLink v-if="!auth.loggedIn" href="/api/login" block size="md" external>Logg inn</LandingLink>
            <LandingLink v-if="auth.loggedIn" href="/api/logout" block size="md" external>Logg ut</LandingLink> -->
          </div>
        </nav>
        <div>
          <div class="hidden md:flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50">
            <ColorModeButton />
            <UserContextMenu v-if="!open" />
            <!-- <LandingLink v-if="!auth.loggedIn" href="/api/login" external>Logg inn</LandingLink>
            <LandingLink v-if="auth.loggedIn" href="/api/logout" external>Logg ut</LandingLink> -->
          </div>
        </div>
      </div>
    </header>
  </LandingContainer>
</template>
