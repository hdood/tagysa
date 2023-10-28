<template>
    <div>
        <div v-if="user.cards.length == 0">
            <div class="flex text-center flex-col items-center gap-10">
                <span class="text-2xl font-medium">{{ $t('noCards') }}</span>
                <button class="btn btn-primary" @click="showAddModal = true">
                    {{ $t("linkCard") }}
                </button>
            </div>
        </div>
        <div v-else class="flex flex-col gap-6">
            <div class="w-full flex justify-end">
                <button class="btn btn-primary" @click="showAddModal = true">
                    {{ $t("linkCard") }}
                </button>
            </div>
            <div v-for="card in user.cards" class="flex justify-between items-center bg-primary  p-4 rounded">
                <div class=" text-primary-content flex items-center gap-2">

                    <icon name="solar:card-bold" size="30" />
                    <div>{{ card.name }}</div>

                </div>
                <div>

                    <div @click.stop="">
                        <NuxtLink :to="'/profile/' + card.id" class="btn btn-base">
                            {{ $t('editProfile') }}
                        </NuxtLink>
                    </div>                </div>
            </div>
        </div>
        <LinkCardModal :show="showAddModal" @close="showAddModal = false" />
    </div>
</template>
    
<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "~/stores/user";

const { user } = storeToRefs(useUserStore());
definePageMeta({ middleware: "is-logged-out" });

const showAddModal = ref(false);

</script>
    
<style scoped></style>
    