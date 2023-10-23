<template>
    <div>

        <div class="w-full flex justify-between flex-col lg:flex-row gap-2 lg:gap-0">
            <h1 class="text-3xl font-medium">Coupons</h1>
            <div class="text-3xl font-medium">
                Total:₹{{ user.balance }}
            </div>
        </div>

        <div class="mt-8 space-y-3">
            <Coupon v-for="coupon in user.referralCoupons" :coupon="coupon" /> 
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '~/stores/user';


const { user } = storeToRefs(useUserStore())

function payout(){

}


</script>

<style scoped>

</style>