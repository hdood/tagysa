<template>
  <div class="flex h-screen fixed w-screen dark:bg-slate-800 pb-20 lg:pb-0">
    <!-- <div
      class="h-screen hidden md:hidden lg:block w-24 hover:w-[12rem] [&:hover_.item]:inline [&:hover_.item-wrapper]:w-36 [&:hover_.item-wrapper]:transition-all duration-300 transition-all"
    >
      <SideNavigation />
    </div> -->
    <div class="main flex-grow h-full flex flex-col items-center overflow-y-scroll overflow-x-hidden mb-32 lg:mb-0">
      <div class="navbar container max-w-7xl mt-3 shadow-lg  bg-base-200">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <NuxtLink to="/dashboard" :class="[useRoute().name == 'index-dashboard' && 'active']">{{ $t('dashboard') }}</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/account" :class="[(useRoute().name == 'index-account' || useRoute().name == 'index-account-cards') && 'active']">{{ $t('account') }}</NuxtLink>
              </li>
              <li v-if="locale != 'ar'">
                <a @click.prevent="setLocal('ar')">العربية</a>
              </li>
              <li v-else><a @click.prevent="setLocal('en')">English</a></li>
            </ul>
          </div>
          <a class="btn btn-ghost normal-case text-xl"><Logo class="relative bottom-5" /></a>
        </div>
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal gap-2  px-1">
            <li>
              <NuxtLink to="/dashboard" :class="[useRoute().name == 'index-dashboard' && 'active']">{{ $t('dashboard') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/account" :class="[(useRoute().name == 'index-account' || useRoute().name == 'index-account-cards') && 'active']">{{ $t('account') }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="navbar-end">
          <div class="navbar-end flex items-center gap-4">
            <div class="dropdown dropdown-hover">
              <label class="swap swap-rotate mt-1">
                <input type="checkbox" v-model="checked" />

                <svg class="swap-off fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>

                <svg class="swap-on fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
              </label>
            </div>
            <button @click="setLocal('ar')" v-if="locale != 'ar'"
              class="btn btn-ghost normal-case btn-sm lg:block hidden">
              العربية
            </button>
            <button @click="setLocal('en')" v-else
              class="btn btn-ghost normal-case btn-sm lg:block hidden">English</button>
            <div class="flex items-center space-x-3">
             
              <details class="dropdown ">
                <summary class="m-1 btn btn-ghost">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img :src="user.image" />
                    </div>
                  </div>
                </summary>
                <ul class="p-2 shadow menu dropdown-content z-[1]  rounded-box w-52 bg-base-300 ">
                  <li @click="logout"><a>Logout</a></li>
                </ul>
              </details>
            </div>
          </div>

        </div>
      </div>

      <div class="w-full min-h-fit px-2 p-1 mt-10">
        <slot />
      </div>
      
    </div>

    <div class="lg:hidden md:fixed fixed bottom-3 w-full z-50">
      <BottomNavigation />
    </div>

    <ShareModal :show="showShareModal" @close="showShareModal = false" :user="user" />

		<ConfirmModal
    :show="deleteConfirm"
    title="Logout"
    body="Are you sure you want to logout"
    type="danger"
    @close="deleteConfirm = false"
    @confirm="logout()"
    positive="Logout"
  />
  </div>
</template>
<script setup>

import { useUserStore } from "~/stores/user";
import { theme } from "~/data/theme";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";
const { user } = storeToRefs(useUserStore());
const { getUser, refreshFrame } = useUserStore()


const authStore = useAuthStore()
const deleteConfirm = ref(false);


async function logout() {
		await authStore.logout();
		useRouter().push("/login");
	}


const showShareModal = ref(false);
const { locale } = useI18n();

function setLocal(_locale) {
  locale.value = _locale;
  localStorage.setItem('vkey-locale', _locale);
}

const checked = computed({
  get: () => theme.value == 'dark',
  set: (val) => {
    const currentTheme = localStorage.getItem('tagysa-theme');
    const newTheme = currentTheme == 'winter' ? 'halloween' : 'winter';
    localStorage.setItem('tagysa-theme', newTheme);
    theme.value = newTheme;
    refreshFrame()
  },
});


onMounted(() => getUser());


</script>

<style scoped></style>
