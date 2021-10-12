getvid= async ()=>{
        try {
            const res = await fetch("/.netlify/functions/getvid", {
                method: 'PUT',
                body: JSON.stringify({"token":"72343weda4252752"}),
            });
            const movies = await res.json();
            console.log(JSON.stringify(movies))
        } catch (error) {
            console.error(error);
        }
}

 getElementById('nname').innerHTML = JSON.stringify(movies)


