export async function call(url, boulder) {
    let endpoint = "/boulder/edit";
    fetch(url + endpoint, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(boulder)
    })
    .then(res => {
        console.log(res);
        return res.json();
    })  
    .then(data => data)
    .catch(err => console.log("ERROR: " + err));
    
};