<template>
	<Combobox
		v-model="selected"
		defaultValue="platform"
	>
		<div class="relative max-w-[10rem] bg-white">
			<div
				class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
			>
				<ComboboxInput
					class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 bg-white text-gray-900"
					:displayValue="(link) => link.name"
					@change="query = $event.target.value"
				/>
				<ComboboxButton
					class="absolute inset-y-0 right-0 flex items-center pr-2"
				>
					<icon name="zondicons:cheveron-down" />
				</ComboboxButton>
			</div>
			<TransitionRoot
				leave="transition ease-in duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
				@after-leave="query = ''"
			>
				<ComboboxOptions
					class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
				>
					<div
						v-if="filteredLinks.length === 0 && query !== ''"
						class="relative cursor-default select-none py-2 px-4 text-gray-700"
					>
						Nothing found.
					</div>

					<ComboboxOption
						v-for="link in filteredLinks"
						as="template"
						s
						:key="link.name"
						:value="link"
						v-slot="{ selected, active }"
					>
						<li
							class="relative cursor-default select-none py-2 pl-10 pr-4"
							:class="{
								'bg-gradient-to-r from-indigo-500 to-indigo-700 cursor-pointer text-white':
									active,
								'text-gray-900': !active,
							}"
						>
							<span
								class="truncate flex items-center gap-3"
								:class="{
									'font-medium': selected,
									'font-normal': !selected,
								}"
							>
								<icon :name="link?.icon" />
								{{ link.name }}
							</span>
							<span
								v-if="selected"
								class="absolute inset-y-0 left-0 flex items-center pl-3"
								:class="{
									'text-white': active,
									'text-teal-600': !active,
								}"
							>
								<icon name="fluent:checkmark-12-filled" />
							</span>
						</li>
					</ComboboxOption>
				</ComboboxOptions>
			</TransitionRoot>
		</div>
	</Combobox>
</template>

<script setup>
	import {
		Combobox,
		ComboboxInput,
		ComboboxButton,
		ComboboxOptions,
		ComboboxOption,
		TransitionRoot,
	} from "@headlessui/vue";
	import predefinedLinks from "~/data/predefinedLinks";

	const props = defineProps(["modelValue"]);
	const emit = defineEmits(["update:modelValue"]);

	let selected = ref(props.modelValue);
	let query = ref("");

	watch(selected, (value) => emit("update:modelValue", value));

	let filteredLinks = computed(() =>
		query.value === ""
			? predefinedLinks
			: predefinedLinks.filter((link) =>
					link.name
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.value.toLowerCase().replace(/\s+/g, ""))
			  )
	);
</script>
