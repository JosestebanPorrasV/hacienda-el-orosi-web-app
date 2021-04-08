const baseUrl = process.env.REACT_APP_API_URL;

const FetchConsult = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  return fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      return response;
    })
    .catch(function (err) {
      console.error(err);
    });
};

export { FetchConsult };
