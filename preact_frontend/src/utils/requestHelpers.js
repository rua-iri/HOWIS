const baseURL = "https://pki9ud0ty9.execute-api.me-south-1.amazonaws.com/Prod";

export async function sendSite(url) {
  const endpoint = `${baseURL}/up?site=${url}`;

  const response = await fetch(endpoint, { method: "POST" });
  const data = await response.json();

  console.log(data);

  return data;
}

export async function getItemStatus(itemID) {
  const endpoint = `${baseURL}/status?id=${itemID}`;
  console.log(endpoint)

  setTimeout(() => {
    
  }, 500);

  const response = await fetch(endpoint, { method: "GET" });
  const data = await response.json();

  console.log(data);

  return data;
}
