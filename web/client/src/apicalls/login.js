export async function call(url, credentials) {
    let endpoint = "/user/login";
    return fetch(url + endpoint, {
            method: "POST",
            headers: {
                "Authentication": credentials
            }
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                return null;
            }
        })
        .then(data => data)
        .catch(err => {
            console.log("ERROR: " + err);
            return null;
        });
        
};
