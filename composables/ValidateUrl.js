export default function (url) {
	var pattern =
		/^(?:(?:https?):\/\/)?(?:www\.)?([a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,})(?:\/[^\s]*)?$/i;

	return pattern.test(url);
}
