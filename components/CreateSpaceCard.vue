<template>
	<div class="card min-w-fit bg-primary text-base-100 shadow-lg">
		<div class="card-body">
			<h2 class="card-title">Create Space!</h2>
			<p>Crate a space and save the people</p>
			<div class="card-actions justify-end">
				<Button
					type="primary-content"
					class="px-4 h-10"
					@click="showCreateModal = true"
					>Create</Button
				>
			</div>
		</div>

		<CreateSpaceModal
			:show="showCreateModal"
			@close="showCreateModal = false"
		/>
	</div>
</template>

<script setup>
	const showCreateModal = ref(false);
</script>

<style scoped></style>
