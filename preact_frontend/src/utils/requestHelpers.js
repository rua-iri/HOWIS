const baseURL = "https://1tw25cqjw9.execute-api.me-south-1.amazonaws.com/Prod";

export async function sendSite(url) {
  const endpoint = `${baseURL}/up?site=${url}`;

  const response = await fetch(endpoint, { method: "POST" });
  const data = await response.json();

  console.log(data);

  return data;
}

export async function getItemStatus(itemID) {
  const endpoint = `${baseURL}/status?id=${itemID}`;

  // make request after 0.5 seconds to ensure
  // that the records in the db have been updated
  setTimeout(() => {
    fetch(endpoint, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      });
  }, 500);
}
