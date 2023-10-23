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
        <div v-else>
            <div class="w-full flex justify-end">
                <button class="btn btn-primary" @click="showAddModal = true">
                    {{ $t("linkCard") }}
                </button>
            </div>
            <div v-for="card in user.cards">
                <div class="bg-base-100 p-4 max-w-sm rounded-lg text-base-content">
                    <div>{{ card.name }}</div>
                    <div>
                        Created {{ card.created_at }}
                    </div>

                </div>
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
    