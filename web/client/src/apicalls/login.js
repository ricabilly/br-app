export async function call(url, credentials) {
    let endpoint = "/user/login";
    fetch(url + endpoint, {
            method: "POST",
            headers: {
                "Authentication": credentials
            }
        })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(data => data)
        .catch(err => console.log("ERROR: " + err));
        
};
