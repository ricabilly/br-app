export async function call(url) {
  let endpoint = "/boulder";
  return fetch(url + endpoint)
    .then(res => {
        return res.json();
    })  
    .then(data => data)
    .catch(err => console.log("ERROR: " + err));
      
};
