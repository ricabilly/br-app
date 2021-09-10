export async function call(url, token) {
  let endpoint = "/boulder";
  return fetch(url + endpoint, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return null;
      }
    })
    .then((data) => data)
    .catch(err => {
      console.log("ERROR: " + err);
      return null;
  });
}
