<template>
	<Combobox
		v-model="selected"
		defaultValue="platform"
		class="z-[30]"
	>
		<div class="relative lg:max-w-[14rem] max-w-[10rem] bg-white">
			<div
				class="relative rounded-xl w-full full cursor-default border border-indigo-600 overflow-hidden bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
			>
				<ComboboxInput
					class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 bg-white text-gray-900"
					:displayValue="(media) => media.name"
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
					class="absolute mt-1 px-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm space-y-1"
				>
					<div
						v-if="filteredMedias.length === 0 && query !== ''"
						class="relative cursor-default select-none py-2 px-4 text-gray-700"
					>
						Nothing found.
					</div>

					<ComboboxOption
						v-for="media in filteredMedias"
						as="template"
						:key="media.name"
						:value="media"
						v-slot="{ selected, active }"
					>
						<li
							class="relative cursor-default select-none py-2 px-2 pr-4 rounded-md"
							:class="{
								'bg-gradient-to-r from-indigo-500 to-indigo-700 cursor-pointer text-white':
									active,
								'text-gray-900': !active,
								'bg-indigo-300': selected,
							}"
						>
							<span
								class="truncate flex items-center gap-3"
								:class="{
									'font-medium': selected,
									'font-normal': !selected,
								}"
							>
								<span class="text-indigo-600">
									<icon :name="media?.icon" />
								</span>
								{{ media.name }}
							</span>
							<span
								v-if="selected"
								class="absolute inset-y-0 left-0 flex items-center pl-3"
								:class="{
									'text-white': active,
									'text-teal-600': !active,
								}"
							>
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

	import media from "~/data/media";

	const props = defineProps(["modelValue"]);
	const emit = defineEmits(["update:modelValue"]);

	let selected = ref(props.modelValue);
	let query = ref("");

	watch(selected, (value) => emit("update:modelValue", value));

	let filteredMedias = computed(() =>
		query.value === ""
			? media
			: media.filter((media) =>
					media.name
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.value.toLowerCase().replace(/\s+/g, ""))
			  )
	);
</script>
