<template>
	<div
		class="h-12 bg-base-200 w-11/12 rounded-xl shadow-2xl flex mx-auto justify-center gap-7 px-2 items-center"
	>
		<routerLink to="/dashboard">
			<BottomNavigationItem :active="['index-dashboard']">
				<icon
					name="material-symbols:dashboard"
					size="20"
				/>
			</BottomNavigationItem>
		</routerLink>
		<routerLink to="/profile">
			<BottomNavigationItem active="index-profile">
				<icon
					name="fluent:card-ui-24-filled"
					size="20"
				/>
			</BottomNavigationItem>
		</routerLink>
		<routerLink to="/account">
			<BottomNavigationItem :active="['index-account', 'index-account-cards']">
				<icon
					name="mdi:account"
					size="20"
				/>
			</BottomNavigationItem>
		</routerLink>
		<routerLink to="/preview">
			<BottomNavigationItem :active="['index-preview']">
				<icon
					name="fluent:preview-link-20-filled"
					size="20"
				/>
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
