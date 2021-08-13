export default {
    async call(url, credentials) {
        let endpoint = "/user/login";
        return fetch(url + endpoint, {
            method: "POST",
            headers: {
                "Authentication": credentials
            }
        })
        .then((response) => {
            if(!response.ok) {
                alert("Login failed! Code " + response.status);
                return null;
            }
            let user = response.json();
            return user;
        });

    }
}