<template>
	<AdminLayout>
		<div
			id="MorePage"
			class="flex"
		>
			<div class="rounded-md bg-white w-full">
				<button
					@click="logout()"
					class="w-full flex items-center text-gray-600 p-3 hover:text-black"
				>
					<Icon
						name="circum:logout"
						class="mr-6"
					/>
					Sign out
				</button>
			</div>
		</div>
	</AdminLayout>
</template>

<script setup>
	import AdminLayout from "~~/layouts/AdminLayout.vue";
	import { useUserStore } from "~~/stores/user";
	const userStore = useUserStore();
	const router = useRouter();

	let windowWidth = ref(window.innerWidth);

	definePageMeta({ middleware: "is-logged-out" });

	onMounted(() => {
		window.addEventListener("resize", function () {
			windowWidth.value = window.innerWidth;
		});
	});

	const logout = async () => {
		let res = confirm("Are you sure you want to sign out?");
		try {
			if (res) {
				await userStore.logout();
				router.push("/login");
			}
		} catch (error) {
			console.log(error);
		}
	};

	watch(
		() => windowWidth.value,
		() => {
			if (windowWidth.value >= 767) {
				router.push("/admin");
			}
		}
	);
</script>
