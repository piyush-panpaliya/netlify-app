async function postFormDataAsJson({ url, formData }) {
	const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);
    console.log(plainFormData.name)
	const fetchOptions = {
		method: "PUT",
		headers: {
     /* Required for CORS support to work */
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET,PUT, POST, OPTIONS",
        },
		body: formDataJsonString,
	};

	const response = await fetch(url, fetchOptions);
	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}
	return response.json();

}


async function handleFormSubmit(event) {
	event.preventDefault();

	const form = event.currentTarget;

	const url = "https://bwac.pshisop.gq/api/getvid";
	try {
		const formData = new FormData(form);
		console.log(Object.fromEntries(formData.entries()));
	    const responseData = await postFormDataAsJson({url , formData });
		console.log(responseData.vid);
		var urlf = new URL("https://bwac.pshisop.gq/video?vid=");
        urlf.searchParams.set('vid', responseData.vid);
        window.location = urlf;
	} catch (error) {
		console.error(error);
	}
}


const addvideo = document.getElementById("form");
addvideo.addEventListener("submit", handleFormSubmit);
