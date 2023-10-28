<template>
	<div id="ProfileSection" class="w-full bg-base-200 rounded-lg">
		<form @submit.prevent="updateProfileInfos">
			<div class="w-full rounded-3xl p-6">
				<div>
					<TextInput class="mt-4" placeholder=" Name" v-model:input="name" :rounded="true" label="Full Name"
						inputType="text" :error="errors && errors?.name ? errors?.name[0] : ''" />
				</div>
				<div>
					<TextInput class="mt-4" placeholder="Title" v-model:input="designation" :rounded="true"
						label="Title" inputType="text"
						:error="errors && errors?.designation ? errors?.designation[0] : ''" />
				</div>
				<label for="bio" class="flex flex-col mt-5 gap-1">
					<span class="text-sm font-medium">About me</span>
					<textarea class="textarea textarea-primary text-sm w-full py-3.5 px-3" placeholder="About me" v-model="bio"
						rows="4" maxlength="300" id="bio"></textarea>
				</label>
				<div class="flex items-center justify-end text-[#676B5F] text-[13px]">{{ bioLengthComputed }}/300</div>
				<div class="w-full">
					<Button type="primary" :loading="savingBioLoading"
						class="p-2 w-44 block mx-auto">
						Save Bio
					</Button>
				</div>
			</div>
		</form>
	</div>
</template>

<script setup>
import axios from '~~/plugins/axios';
import { useUserStore } from '~~/stores/user';
import { useNotificationsStore } from '~/stores/notifications';
import { storeToRefs } from 'pinia';
import { useProfileStore } from '~/stores/profile';

const { successNotification } = useNotificationsStore();

const app = useNuxtApp();
const $axios = axios(app).provide.axios;

const savingBioLoading = ref(false);

const loading = ref(false);

const userStore = useUserStore();
const { activeProfile: user } = storeToRefs(useProfileStore());


const name = ref('');
const bio = ref('');
const designation = ref('');

const editing = ref(false);

const errors = ref({});

onMounted(async () => {
	await useProfileStore().fetchProfile(useRoute().params.id)
	syncState();
});

function syncState(){
	name.value = user.value.name
	designation.value = user.value.designation
	bio.value = user.value.bio

}

const updateProfileInfos = async () => {
	errors.value = [];
	// if the entered name is the same as the current name we don't have update it

	try {
		loading.value = true;
		savingBioLoading.value = true;
		await $axios.patch(`/api/profiles/${user.value.id}`, {
			name: name.value,
			bio: bio.value,
			designation: designation.value,
		});

		await userStore.getUser();
		
		successNotification('bio content updated successfully');

		userStore.refreshFrame();
		editing.value = false;
	} catch (error) {
		errors.value = error.response.data?.errors;
	}
	loading.value = false;
	savingBioLoading.value = false;
};

const bioLengthComputed = computed(() => {
	return !bio.value ? 0 : bio.value.length;
});
</script>

<style scoped></style>
