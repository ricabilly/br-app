export async function call(url, token, boulder) {
    let endpoint = "/boulder/edit";
    return fetch(url + endpoint, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": token,
        },
        body: JSON.stringify(boulder)
    })
    .then(res => {
        if (res.ok) {
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