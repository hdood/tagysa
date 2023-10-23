<template>
    <div class="bg-base-100 p-4 rounded-lg" >
        <div class="flex lg:flex-row flex-col lg:justify-between gap-2 lg:gap-0 w-full px-6">
            <div class="flex flex-col gap-1">
                <span class="opacity-80">
                    Code
                </span>
                <div class="flex items-center gap-2">
                    <h1 class="text-2xl font-medium">{{ coupon.code }}</h1>
                    <Button @click="copyContent" :type="copied ? 'success' : 'primary'" class="btn-xs mb-1">
                        <icon v-if="copied" name="ic:baseline-check" />
                        <icon v-else name="ph:copy-bold" />
                    </Button>
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <span class="opacity-80">
                    Earn Rate
                </span>
                <div class="flex items-center gap-2">
                    <h1 class="text-2xl font-medium">{{ coupon.value }}{{ coupon.strategy == 'fixed' ? '₹' : '%' }}/redeemer</h1>
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <span class="opacity-80">
                    Redeemed
                </span>
                <div class="flex items-center gap-2">
                    <h1 class="text-2xl font-medium">{{ coupon.redeemers }} times</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup >

const props = defineProps(['coupon']); 

const { coupon } = toRefs(props); 

const copied = ref(false)

const copyContent = async () => {
		try {
			await navigator.clipboard.writeText(
				coupon.value.code
			);
			copied.value = true;
			setTimeout(() => {
				copied.value = false;
			}, 3000);
		} catch (err) {}
};

</script>

<style scoped>

</style>