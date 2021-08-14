export async function call(url, boulder) {
    let endpoint = "/boulder/edit";
    let response;
    try {
        response = await fetch(url + endpoint, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(boulder)
        });
    
        if(!response.ok) {
            alert("Failed to add boulder! Code " + response.status);
            return null;
        }
        return response.json();
    } catch (err) {
        console.log("Failed to connect to API");
        return null;
    }
    
};