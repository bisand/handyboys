<script setup lang="ts">
import { Dropdown, initDropdowns } from 'flowbite';
import { useFlowbite } from '~/composables/useFlowbite';

const auth = useAuth();

onMounted(() => {
    useFlowbite(() => {
        initDropdowns();
    })
})

let dropdown: any = null;
const hideDropdown = () => {
    if (!dropdown) {
        dropdown = new Dropdown(
            document.getElementById("user-dropdown"),
            document.getElementById("user-menu-button")
        );
    }
    dropdown.hide()
};

</script>

<template>
    <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button"
        aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span class="sr-only">Open user menu</span>
        <Gravatar v-if="auth.loggedIn" :email="auth.user?.email" :size="40" class="rounded-full w-10 h-10 hover:opacity-80 transition-opacity" />
        <svg v-else class="w-8 h-8 rounded-full text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600" fill="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
    </button>

    <div class="z-50 hidden my-4 min-w-64 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
        <div class="px-4 py-3">
            <span v-if="auth.loggedIn" class="block text-sm text-gray-900 dark:text-white">{{ `${auth.user?.given_name} ${auth.user?.family_name}` }}</span>
            <span v-if="auth.loggedIn" class="block text-sm  text-gray-500 truncate dark:text-gray-400">{{ auth.user?.email }}</span>
            <ul class="py-2" aria-labelledby="user-menu-button">
                <li v-if="auth.loggedIn">
                    <NuxtLink to="/dashboard" @click="hideDropdown()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        Dashboard</NuxtLink>
                </li>
                <li v-if="auth.loggedIn">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                </li>
                <li v-if="auth.loggedIn">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                </li>
                <li>
                    <button v-if="auth.loggedIn" @click="navigateTo(`/api/logout`, { external: true }); hideDropdown()"
                        class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</button>
                    <button v-else @click="navigateTo(`/api/login`, { external: true }); hideDropdown()"
                        class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Login</button>
                </li>
            </ul>
        </div>
    </div>
</template>