const baseUrl = process.env.REACT_APP_API_URL;

const FetchConsult = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        Authorization: token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
  }
};

const uploadImage = (endpoint, image) => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  return fetch(url, {
    method: "POST",
    body: image,
    headers: {
      Authorization: token,
    },
  });
};

export { FetchConsult, uploadImage };
