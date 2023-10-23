import Pdf from "~~/components/media/Pdf.vue";
import Youtube from "~~/components/media/Youtube.vue";
import Facebook from "~~/components/media/Facebook.vue";
import Instagram from "~~/components/media/Instagram.vue";
import Image from "~~/components/media/Image.vue";
import Video from "~~/components/media/Video.vue";

export default [
	{
		type: "pdf",
		icon: "bi:file-pdf-fill",
		name: "Pdf file",
		input: "file",
		component: Pdf,
	},
	{
		type: "image",
		icon: "material-symbols:image",
		name: "Image",
		input: "file",
		component: Image,
	},
	{
		type: "video",
		icon: "mdi:video",
		name: "Video",
		input: "file",
		component: Video,
	},
	{
		type: "instagram",
		icon: "skill-icons:instagram",
		name: "Instagram Post",
		input: "embedding",
		component: Instagram,
	},
	{
		type: "facebook",
		icon: "logos:facebook",
		name: "Facebook post",
		input: "embedding",
		component: Facebook,
	},
	{
		type: "youtube",
		icon: "logos:youtube-icon",
		name: "Youtube video",
		input: "embedding",
		component: Youtube,
	},
];
