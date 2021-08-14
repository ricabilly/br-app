export async function  call(url, credentials) {
    let endpoint = "/user/login";
    let response;
    try {
        response = await fetch(url + endpoint, {
            method: "POST",
            headers: {
                "Authentication": credentials
            }
        });
    
        if(!response.ok) {
            alert("Login failed! Code " + response.status);
            return null;
        }
        let user = response.json();
        return user; 
    } catch (error) {
        console.log("Failed to connect to API");
        return null;
    }
        
};
