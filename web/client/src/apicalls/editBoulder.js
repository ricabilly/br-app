export default {
    async call(url, boulder) {
        let endpoint = "/boulder/edit";
        return fetch(url + endpoint, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(boulder)
        }).then((response) => {
            if(!response.ok) {
                alert("Failed to add boulder! Code " + response.status);
                return null;
            }
            return response.json();
        });
    }
}