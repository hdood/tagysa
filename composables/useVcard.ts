import VCard from "vcard-creator";

export const useVcard = () =>  (
	name: string,
	email: string,
	phone: string,
	address: string,
	designation : string
) => {
	const myVCard = new VCard();
	myVCard
		.addName(name)
		.addEmail(email)
		.addJobtitle(designation)
		.addPhoneNumber(phone, "WORK")
		.addAddress(address)

	downloadToFile(myVCard.toString(), name + ".vcf", "text/vcard");
};

function downloadToFile(
	content: string,
	filename: string,
	contentType: string
) {
	const a = document.createElement("a");
	const file = new Blob([content], { type: contentType });

	a.href = URL.createObjectURL(file);
	a.download = filename;
	a.click();

	URL.revokeObjectURL(a.href);
}
