<template>
  <aside
    class="flex flex-col h-[100%] items-center justify-between py-6 bg-base-100 shadow-lg bordered"
  >
    <div class="flex flex-col items-center space-y-20 w-full h-full">
      <div class="text-center flex flex-col items-center gap-5">
        <!-- <Logo /> -->
        <!-- <img src="~/assets/logo2.jpg" class="h-14 w-14" alt=""> -->

        <div class="avatar">
          <div class="w-16 rounded-full">
            <img :src="user.image" alt="" />
          </div>
        </div>
        <div class="item hidden text-sm break-words text-center">
          {{ user.name }}
        </div>
      </div>
      <div class="space-y-8 flex flex-col justify-between w-full h-full">
        <div class="flex flex-col items-center gap-6">
          <routerLink to="/admin/">
            <SideNavigationItem active="admin">
              <icon name="fluent:card-ui-24-filled" size="30" />
              <span
                class="item overflow-hidden hidden transition-all duration-300"
                >Bio</span
              >
            </SideNavigationItem>
          </routerLink>
          <routerLink to="/admin/nfc">
            <SideNavigationItem :active="['admin-nfc', 'admin-nfc-orders']">
              <icon name="mdi:nfc" size="30" />
              <span
                class="dark:text-white item overflow-hidden hidden transition-all duration-300"
                >NFC card</span
              >
            </SideNavigationItem>
          </routerLink>
          <routerLink to="/admin/analytics">
            <SideNavigationItem active="admin-analytics">
              <icon name="majesticons:analytics" size="30" />
              <span
                class="dark:text-white item overflow-hidden hidden transition-all duration-300"
                >Analytics</span
              >
            </SideNavigationItem>
          </routerLink>
          <routerLink to="/admin/space">
            <SideNavigationItem :active="['admin-space', 'admin-space-name']">
              <icon name="cib:myspace" size="30" />
              <span
                class="dark:text-white item overflow-hidden hidden transition-all duration-300"
                >Myspace</span
              >
            </SideNavigationItem>
          </routerLink>
          <routerLink to="/admin/account" class="">
            <SideNavigationItem :active="['admin-account', 'admin-account-refer-earn']">
              <icon name="material-symbols:account-box" size="30" />
              <span
                class="dark:text-white item overflow-hidden hidden transition-all duration-300"
                >Account</span
              >
            </SideNavigationItem>
          </routerLink>
          <routerLink to="/admin/preview" class="lg:hidden">
            <SideNavigationItem active="admin-preview">
              <icon name="material-symbols:preview" size="30" />
              <span
                class="dark:text-white item overflow-hidden hidden transition-all duration-300"
                >Preview</span
              >
            </SideNavigationItem>
          </routerLink>
        </div>
        <Button
          type="danger"
          class="min-w-[2.5rem] btn-sm self-center "
          @click="deleteConfirm = true"
        > 
          <div class="flex items-center justify-center gap-2">
            <icon class="block" name="oi:power-standby" />
            <span class="dark:text-white item hidden transition-all"
              >Logout</span
            >
          </div>
        </Button>
      </div>

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
  </aside>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { useUserStore } from "~/stores/user";
import { storeToRefs } from "pinia";
const { user } = storeToRefs(useUserStore());
const authStore = useAuthStore();

const deleteConfirm = ref(false);

async function logout() {
  await authStore.logout();
  useRouter().push("/login");
}
</script>

<style scoped></style>
