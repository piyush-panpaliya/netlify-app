
async function getvidfromapi() {
	const fetchOptions = {method: "PUT",headers: {
     /* Required for CORS support to work */
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET,PUT, POST, OPTIONS",}};
	const response = await fetch("https://bwac.pshisop.gq/api/getallvideo", fetchOptions);
	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}
	return response.json();
}



async function listmap(){
	responsedata= await  getvidfromapi()
	console.log(responsedata);
	array = responsedata.data;
	array.map(list => addvdolist(...list));
}

async function main (){
	await listmap();
	addlistner();
}

const tasksList = document.getElementById('lists');

function addvdolist(nameg,fbg,vidg) {

    const maindiv = document.createElement('div');
    maindiv.setAttribute('class', 'list1');
    
    const namediv = document.createElement('div');
    namediv.setAttribute('class', 'name');

    const name = document.createElement('h4');

    const indiv = document.createElement('div');
    indiv.setAttribute('class', 'in');

    const fbspan = document.createElement('span');
    fbspan.setAttribute('class', 'circle');

    const formdiv = document.createElement('form');
    formdiv.setAttribute('class', 'form');
    formdiv.setAttribute('id', vidg);
    formdiv.setAttribute('action', "");
    //formdiv.setAttribute('onsubmit', "return false");

    const tvnin = document.createElement('input');
    tvnin.setAttribute('class', 'no');
    tvnin.setAttribute('name', 'tvn');
    tvnin.setAttribute('type', 'number');
    tvnin.setAttribute('min', '1');
 
    const genbtn = document.createElement('input');
    genbtn.setAttribute('class', 'gen');
    genbtn.setAttribute('type', 'submit');
    genbtn.setAttribute('value', 'GENERATE');
   // genbtn.setAttribute('onclick', 'buttonIndex=0; ');

    const tin = document.createElement('output');
    tin.readOnly = true;
    tin.setAttribute('class', 'inp');
    tin.setAttribute('name', 'token');
    
    const delbtn = document.createElement('input');
    delbtn.setAttribute('class', 'material-icons-outlined addb');
    delbtn.setAttribute('value', 'delete');
    delbtn.setAttribute('type', 'submit');
 //   delbtn.setAttribute('onclick', 'buttonIndex=1; ');
    
    

    name.innerText = nameg; // putting value of input in the li
    let color ="";
    if (fbg == 1) {
    	color = "green";
	} else if (fbg == 2) {
		color = "red";
	} else {
		color = "grey";
	}
    fbspan.style.setProperty('background', color); 

    formdiv.appendChild(tvnin);
    formdiv.appendChild(genbtn);
    formdiv.appendChild(tin);
    formdiv.appendChild(delbtn);

    indiv.appendChild(fbspan);
    indiv.appendChild(formdiv);

    namediv.appendChild(name);

    maindiv.appendChild(namediv);
    maindiv.appendChild(indiv);
    
    tasksList.appendChild(maindiv);

    // Run this function when token has to be generated and vdo removed
 //   formdiv.addEventListener('submit',handleForm1Submit);
    
   // remove(delbtn)

}
//const addvideo1 = document.getElementById("310882769484906696");
//addvideo1.addEventListener("click", handleForm0Submit);

 function addlistner (){
	let elementsArray = document.querySelectorAll(".form");
	elementsArray.forEach(function(elem){
		elem.addEventListener("submit", handleForm1Submit);});
}

async function fetchdata(vid,tvn) {
    var idObj1 = {};
    idObj1.vid = vid;
    idObj1.tvn = tvn;
    console.log(idObj1);
    var body1 = JSON.stringify(idObj1);
    const fetchOptions = {
        method: "PUT",
        headers: {
     /* Required for CORS support to work */
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET,PUT, POST, OPTIONS",
        },
        body: body1,
    };

    const response = await fetch("https://bwac.pshisop.gq/api/createtoken", fetchOptions);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}




async function handleForm1Submit(event) {
	let buttonIndex = 0;
	if (buttonIndex== 0) {
		event.preventDefault();
		const form = event.currentTarget;
		const url = "https://bwac.pshisop.gq/api/createtoken";
		try {
			const formData = new FormData(form);
			formdatatvn = Object.fromEntries(formData.entries());
			tvn = formdatatvn.tvn;
			console.log(tvn);
			vid = form.getAttribute("id")
		    const responseData = await fetchdata(vid ,tvn );
	        
			console.log( responseData.data.token );
			tk = form.querySelector(".inp")
			console.log(tk);
			tk.innerHTML = responseData.data.token;
		} catch (error) {
			console.error(error);
		}
    }
    else if (buttonIndex== 1) {
    	const form = event.currentTarget;
    	vid = form.getAttribute("id")
    	try{
    		resp = await deldata(vid );
    		console.log(resp)
    	} catch(error) {
			console.error(error);
		}
    }
}




