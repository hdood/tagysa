<template>
	<Head
		><title>Space - {{ useRoute()?.params?.name }}</title></Head
	>

	<div class="lg:p-8 p-2">
		<div>
			<NuxtLink to="/admin/space">
				<icon
					name="ic:round-arrow-back"
					size="40"
					class="p-1 cursor-pointer hover:bg-base-300 rounded-md"
				/>
			</NuxtLink>
		</div>
		<div class="flex gap-3 mt-3">
			<div class="hidden lg:block">
				<ul
					class="menu w-56 rounded-box space-y-3 shadow-lg border bg-base-200"
				>
					<h2 class="menu-title">Spaces</h2>
					<li
						v-for="space in spaces"
						:key="space.id"
					>
						<NuxtLink
							:to="`/admin/space/${space.name}`"
							:class="[
								space.name == useRoute().params.name &&
									'active',
							]"
						>
							{{ space.name }}
						</NuxtLink>
					</li>
				</ul>
			</div>
			<table class="lg:table shadow-lg hidden">
				<!-- head -->
				<thead>
					<tr>
						<th>Name</th>
						<th>Bio</th>
						<th>Email</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<SpaceUserRow
						v-for="user in activeSpace?.users"
						:user="user"
						:key="user.id"
					/>
				</tbody>
			</table>
		</div>

		<div class="w-full flex flex-col gap-3 items-center lg:hidden">
			<SpaceUserCard
				v-for="user in activeSpace?.users"
				:user="user"
				:key="user.id"
			/>
		</div>
	</div>
</template>

<script setup>
	import { storeToRefs } from "pinia";
	import { useSpacesStore } from "~/stores/spaces";
	const spacesStore = useSpacesStore();
	const { spaces } = storeToRefs(spacesStore);

	const activeSpace = computed(() =>
		spaces.value.find((space) => space.name == useRoute().params.name)
	);
	onMounted(async () => {
		await spacesStore.fetchAll();
	});
</script>

<style scoped></style>
