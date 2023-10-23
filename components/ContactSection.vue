<template>
	<div id="ContactsSection">
		<div class="rounded-3xl w-full bg-base-200 p-3">
			<form @submit.prevent="updateContactInfos">
				<label class="label">
					<span class="label-text">Phone</span>
				</label>
				<div class=" flex lg:flex-nowrap flex-wrap items-center w-full gap-2">
					<div class="join">
						<CountryCodePicker v-model="countryCode" />
						<div>
							<div class="">
								<input id="placeholder" placeholder="Phone" maxlength="10"
									class="input input-bordered w-full max-w-xs input-primary join-item" type="number"
									v-model="phone" autocomplete="off" />
							</div>
						</div>
					</div>
				</div>
				<div v-if="errors.phone" class="text-error">
					{{ errors && errors.phone ? errors.phone[0] : "" }}
				</div>

				<div class="w-full flex gap-3">
					<TextInput placeholder="Email" v-model:input="email" class="join-item " label="Email" inputType="text"
						:rounded="true" :error="errors && errors.email ? errors.email[0] : ''">
					</TextInput>
				</div>
				<div class="flex gap-2 items-end">
					<TextInput placeholder="Address" v-model:input="address" :rounded="true" label="Address"
						inputType="text" :error="errors && errors.address
								? errors.address[0]
								: ''
							">
					</TextInput>
				</div>
				<div class="w-full flex gap-3">
					<TextInput placeholder="Website" v-model:input="website" inputType="text" label="Website"
						:rounded="true" :error="errors && errors.website ? errors.website[0] : ''
							">
					</TextInput>
				</div>
				<Button type="primary" class="min-w-[10rem] h-10 mt-10" :loading="loading">
					Save
				</Button>
			</form>
		</div>
	</div>
</template>

<script setup>
import { useUserStore } from "~~/stores/user";
import axios from "~~/plugins/axios";
import { storeToRefs } from "pinia";
import { useNotificationsStore } from "~/stores/notifications";
import ValidateUrl from "~/composables/ValidateUrl";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { successNotification } = useNotificationsStore();

const app = useNuxtApp();
const $axios = axios(app).provide.axios;

const phone = ref("");
const address = ref("");
const website = ref("");
const email = ref("");
const errors = ref({});
const countryCode = ref(
	user.value.country_code ? user.value.country_code : 966
);
const loading = ref(false);

function syncState() {
	phone.value = user.value.phone;
	address.value = user.value.address;
	website.value = user.value.website;
	countryCode.value = user.value.country_code;
	email.value = user.value.contact_email;
}

watch(phone, (value) => {
	if (value?.toString()?.length > 10) {
		phone.value = value.toString().slice(0, 10);
	}
});

const updateContactInfos = async () => {
	errors.value = {};

	if (phone?.value?.toString().length < 4) {
		errors.value = { phone: ["phone number must be 4 digits or more"] };
		return;
	}

	if (email.value == "") {
		errors.value = { email: ["email value cannot be empty"] };
		return;
	}
	if (!ValidateUrl(website.value) && website.value) {
		errors.value = { website: ["website field must be a valid url"] };
		return;
	}

	if (!website?.value?.includes("https") && website.value) {
		website.value = "https://" + website.value;
	}
	try {
		loading.value = true;

		await $axios.patch(`/api/users/contact/${user.value.id}`, {
			phone: phone.value,
			address: address.value,
			website: website.value,
			country_code: countryCode.value ? countryCode.value : 91,
			contact_email: email.value,
		});

		await userStore.getUser();
		userStore.refreshFrame();

		successNotification("Contact info updated successfully");
	} catch (error) {
		errors.value = error.response.data.errors;
	}
	loading.value = false;
};

onMounted(() => {
	syncState();
});
</script>

<style scoped></style>
