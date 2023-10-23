<template>
	<Combobox v-model="selected">
		<div class="relative mt-1">
			<div>
				<ComboboxInput
					class="input input-bordered input-primary input-sm max-w-lg w-full"
					:displayValue="(person) => person.name"
					@change="query = $event.target.value"
				/>
			</div>
			<TransitionRoot
				leave="transition ease-in duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
				@after-leave="query = ''"
			>
				<ComboboxOptions
					class="absolute mt-4 -left-14 lg:left-0 max-h-60 max-w-md min-w-[17rem] lg:min-w-[15rem] flex flex-col overflow-auto rounded-md bg-base-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50"
					:class="[props.comboboxClasses]"
					v-if="query != ''"
				>
					<div
						v-if="users.length === 0 && query !== ''"
						class="relative cursor-default select-none py-2 px-4 text-base-content"
					>
						Nothing found.
					</div>

					<ComboboxOption
						v-for="user in users"
						as="div"
						:key="user.id"
						:value="user"
						v-slot="{ selected, active }"
						class="w-full"
					>
						<slot
							:user="user"
							:active="active"
							:selected="selected"
						/>
					</ComboboxOption>
				</ComboboxOptions>
			</TransitionRoot>
		</div>
	</Combobox>
</template>

<script setup>
	import { ref, computed } from "vue";
	import {
		Combobox,
		ComboboxInput,
		ComboboxButton,
		ComboboxOptions,
		ComboboxOption,
		TransitionRoot,
	} from "@headlessui/vue";
	import axios from "~~/plugins/axios";

	const $axios = axios().provide.axios;
	const users = ref([]);
	const selected = ref();
	const query = ref("");
	const emit = defineEmits(["select"]);
	const props = defineProps(["comboboxClasses"]);

	const search = debounce(async () => {
		users.value = [];
		try {
			const response = await $axios.get(
				`/api/users/search/${query.value}`
			);
			users.value = response.data.data ?? [];
		} catch (error) {
			console.error("something wend wrong", error);
		}
	}, 500);

	function debounce(func, timeout = 300) {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func.apply(this, args);
			}, timeout);
		};
	}

	watch(query, search);
	watch(selected, (value) => {
		emit("select", value);
	});
</script>
