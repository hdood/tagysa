<template>
	<div
		class="h-12 bg-base-200 w-11/12 rounded-xl shadow-2xl flex mx-auto justify-center gap-7 px-2 items-center"
	>
		<routerLink to="/admin/space">
			<BottomNavigationItem :active="['admin-space', 'admin-space-name']">
				<icon
					name="cib:myspace"
					size="20"
				/>
			</BottomNavigationItem>
		</routerLink>
		<routerLink to="/admin">
			<BottomNavigationItem active="admin">
				<icon
					name="fluent:card-ui-24-filled"
					size="20"
				/>
			</BottomNavigationItem>
		</routerLink>
		<routerLink to="/admin/analytics">
			<BottomNavigationItem active="admin-analytics">
				<icon
					name="majesticons:analytics"
					size="20"
				/>
				<span
					class="dark:text-white item overflow-hidden hidden transition-all duration-200"
					>Analytics</span
				>
			</BottomNavigationItem>
		</routerLink>
	</div>
</template>

<script setup>
	import { storeToRefs } from "pinia";
	import { useUserStore } from "~/stores/user";
	const { user } = storeToRefs(useUserStore());
</script>

<style scoped></style>
