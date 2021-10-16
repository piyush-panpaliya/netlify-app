
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const vid = urlParams.get('vid')
console.log(vid);
getlink(vid);
const addvideo = document.getElementById("frame");



async function getlink(vid){
	try {
	console.log(vid);
	var idObj = {};
    idObj.vid = vid;
	const responseData = await postFormDataAsJson(idObj);
	console.log(responseData);
	addvideo.setAttribute("src",responseData) ;
	} 
	catch (error) {
			console.error(error);
	}
   }
async function postFormDataAsJson(id) {
	const formDataJsonString = JSON.stringify(id);
	console.log(formDataJsonString);
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
	const response = await fetch("https://bwac.pshisop.gq/api/linkbyid", fetchOptions);
	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}
	return response.json();

}






		