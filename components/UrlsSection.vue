<template>
	<div class="w-full">
		<div class="mx-auto pb-24 py-3 flex flex-col items-center">
			<div class="mt-4 px-3   w-full flex justify-between" v-if="urlsStore.all.length != 0">
				<span class="text-2xl opacity-75 font-medium">Your Links</span>
				<div>
					<Button type="info" class="h-10 w-full px-8 mx-auto" @click="showLinksModal = true">
						<div class="flex items-center">
							<icon size="25" name="material-symbols:add" />
						</div>
					</Button>
				</div>
			</div>
			<div v-else class="mt-8 mx-2 text-xl font-medium w-full text-center">
				<div>You don't have any links</div>
				<Button type="info" class="h-10  px-8 mx-auto mt-3" @click="showLinksModal = true">
					<div class="flex items-center">
						<span>Add Link</span>
						<icon size="25" name="material-symbols:add" />
					</div>
				</Button>
			</div>

			<draggable v-model="urlsStore.all" :component-data="{ class: 'w-full' }" tag="div" :item-key="'nothing'"
				handle=".handle" ghost-class="bg-base-200" @end="onEnd">
				<template #item="{ element }">
					<Url :link="element" class="mt-3" />
				</template>
			</draggable>
		</div>

		<UrlsModal :show="showLinksModal" @close="showLinksModal = false" />
	</div>
</template>

<script setup>
import { useLinksStore } from "~/stores/links";
import { useUserStore } from "~/stores/user";
import draggable from "vuedraggable";
import { useProfileStore } from "~/stores/profile";
import { storeToRefs } from "pinia";
import { useUrlsStore } from "~/stores/urls";
const urlsStore = useUrlsStore();
const userStore = useUserStore();

const link = ref({ name: "Platform", icon: "" });
const url = ref("");
const loading = ref(false);
const errors = ref({});

const { activeProfile: user } = storeToRefs(useProfileStore());


const showLinksModal = ref(false);

async function onEnd(evt) {
	await urlsStore.reorder();
}

async function addLink() {
	errors.value = {};
	if (url.value == "") {
		errors.value = { url: ["please specify a url for this link"] };
		return;
	}
	loading.value = true;
	try {
		alert(user.value.id)

		const response = await urlsStore.addLink(
			link.value.name,
			url.value,
			urlsStore.all.length,
			user.value.id
		);

		await urlsStore.getAllLinks();

		url.value = "";
		userStore.refreshFrame();
	} catch (error) {
		errors.value = error.response.data.errors;
	}
	loading.value = false;
}
onMounted(async () => {
	await useProfileStore().fetchProfile(useRoute().params.id)
	await urlsStore.getAllLinks(user.value.id);
});
</script>

<style scoped></style>
