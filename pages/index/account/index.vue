<template>
	<div>

		<div class="w-full my-10">
			<div class="flex flex-col items-center  gap-4 ">
				<div class="avatar" @click="openCropper = true">
					<div class="avatar">
						<div class="mask mask-squircle w-40 ">
						  <img :src="user.image" />
						</div>
					</div>
				</div>
				<div><button class="btn btn-primary" @click="openCropper = true">{{$t('update')}}</button></div>
			</div>

			<TextInput v-model:input="name" :label="$t('name')" inputType="text" :error="errors?.name" />

			<Button type="primary" class="mt-3" @click="updateProfileInfos" :loading="loading" > {{$t('save')}} </Button>
		</div>


		<CropperModal :show="openCropper" @data="image = $event" @close="openCropper = false" />
		<h2 class="text-2xl font-medium text-base-content">{{$t('update')}} {{$t('password')}}</h2>
		<form @submit.prevent="submit">
			<TextInput v-model:input="currentPassword" :label="$t('currentPassword')" inputType="password" />
			<TextInput v-model:input="newPassword" :label="$t('newPassword')"  inputType="password"
				:error="errors?.newPassword?.[0]" />
			<TextInput v-model:input="cPassword" :label="$t('newPasswordConfirmation')" :error="errors?.cPassword?.[0]"
				inputType="password" />
			<Button type="primary" class="mt-3" :loading="passwordLoading">{{$t('update')}} {{$t('password')}}</Button>
		</form>
	</div>
	<div class="mt-4">
		<h2 class="text-2xl font-medium text-base-content">{{ $t('delete') }} {{$t('account')}}</h2>
		<form @submit.prevent="destroy">
			<TextInput v-model:input="password" inputType="password" :label="$t('password')" />
			<Button type="danger" class="mt-2" :loading="deleteLoading">{{ $t('delete') }} {{$t('account')}}</Button>
		</form>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";
import { useUserStore } from "~/stores/user";

import axios from '~~/plugins/axios';
const $axios = axios().provide.axios;

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const openCropper = ref(false);
const errors = ref({});
const image = ref({})
const name = ref(user.value.name)
const loading = ref(false)

const { changePassword, deleteAccount } = useAuthStore();
const currentPassword = ref("");
const newPassword = ref("");
const cPassword = ref("");
const password = ref("");

const passwordLoading = ref(false);
const deleteLoading = ref(false);


const updateProfileInfos = async () => {
		errors.value = {};


		if(!name.value){
			errors.value.name = "the name files is required"
			return; 
		}

		try {
			loading.value = true;

			await $axios.patch(`/api/users/${user.value.id}`, {
				name: name.value,
			});

			await userStore.getUser();
		} catch (error) {
			console.log(error)
		}

		loading.value = false;

	};


const updateUserImage = async () => {
	try {
		await userStore.updateUserImage(image.value);
		await userStore.getUser();
		setTimeout(() => (openCropper.value = false), 300);
	} catch (error) {
		openCropper.value = false;
		alert(error);
	}
};

watch(
	() => image.value,
	async () => await updateUserImage(),
);

async function submit() {
	if (newPassword.value.length < 8) {
		errors.value = {
			newPassword: [
				"password length must be longer than 8 characters",
			],
		};
		return;
	}

	if (newPassword.value != cPassword.value) {
		errors.value = {
			cPassword: [
				"password confirmation is not the same as the new password",
			],
		};
		return;
	}

	passwordLoading.value = true;
	await changePassword(
		currentPassword.value,
		newPassword.value,
		cPassword.value
	);
	passwordLoading.value = false;
}

async function destroy() {
	deleteLoading.value = true;
	const result = await deleteAccount(password.value);

	if (result) useRouter().push("/");
	deleteLoading.value = false;
}
</script>
