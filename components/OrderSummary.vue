<template>
    <div class="grid grid-cols-2 gap-y-2">
        <div class="flex items-center gap-2">
            <icon
                class="text-success"
                name="gg:check-o"
            />
            <div class="lg:text-sm text-xs">One time Payment</div>
        </div>
        <div class="flex items-center gap-2">
            <icon
                class="text-success"
                name="gg:check-o"
            />
            <div class="lg:text-sm text-xs">
                FREE shipping in india
            </div>
        </div>
        <div class="flex items-center gap-2">
            <icon
                class="text-success"
                name="gg:check-o"
            />
            <div class="lg:text-sm text-xs">Fine plastic card</div>
        </div>
        <div class="flex items-center gap-2">
            <icon
                class="text-error"
                :class="[
                    selectedIndex == 0
                        ? 'text-error'
                        : 'text-success',
                ]"
                :name="
                    selectedIndex == 0 ? 'gg:close-o' : 'gg:check-o'
                "
            />
            <div class="lg:text-sm text-xs">Hide Tagy logo</div>
        </div>
        <div class="flex items-center gap-2">
            <div class="min-w-fit">
                <icon
                    :class="[
                        selectedIndex == 0
                            ? 'text-error'
                            : 'text-success',
                    ]"
                    :name="
                        selectedIndex == 0
                            ? 'gg:close-o'
                            : 'gg:check-o'
                    "
                />
            </div>

            <div class="lg:text-sm text-xs">
                Name and additional info on card
            </div>
        </div>
        <div class="flex items-center gap-2">
            <div class="min-w-fit">
                <icon
                    :class="[
                        selectedIndex == 0
                            ? 'text-error'
                            : 'text-success',
                    ]"
                    :name="
                        selectedIndex == 0
                            ? 'gg:close-o'
                            : 'gg:check-o'
                    "
                />
            </div>
            <div class="lg:text-sm text-xs">
                Design verification before shipment
            </div>
        </div>
        <div class="flex items-center gap-2">
            <icon
                :class="[
                    selectedIndex == 2
                        ? 'text-success'
                        : 'text-error',
                ]"
                :name="
                    selectedIndex == 2 ? 'gg:check-o' : 'gg:close-o'
                "
            />
            <div class="lg:text-sm text-xs">Your logo on card</div>
        </div>
        <div class="flex items-center gap-2">
            <icon
                :class="[
                    selectedIndex == 2
                        ? 'text-success'
                        : 'text-error',
                ]"
                :name="
                    selectedIndex == 2 ? 'gg:check-o' : 'gg:close-o'
                "
            />
            <div class="lg:text-sm text-xs">Fully customizable</div>
        </div>
    </div>
</template>

<script setup>
	const props = defineProps(["selectedIndex"]);
</script>

<style scoped></style>
