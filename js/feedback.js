async function good(){
	await sendfeed(vid,1);
}

async function bad(){
	await sendfeed(vid,2);
}

async function sendfeed(vid,feed) {
	var idObj2 = {};
    idObj2.vid = vid;
    idObj2.fb = feed;
    console.log(idObj2);
    var body1 = JSON.stringify(idObj2);
	const fetchOptions = {method: "PUT",headers: {
     /* Required for CORS support to work */
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET,PUT, POST, OPTIONS",},
      body: body1,
  		};
	const response = await fetch("https://bwac.pshisop.gq/api/feedback", fetchOptions);
	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}
	return response.json();
}
