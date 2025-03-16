const baseURL = import.meta.env.VITE_BASE_URL


export async function sendSite(url) {
  const endpoint = `${baseURL}/up?site=${url}`;

  const response = await fetch(endpoint, { method: "POST" });
  const data = await response.json();

  console.log(data);

  return data;
}

export async function getItemStatus(itemID) {
  const endpoint = `${baseURL}/status?id=${itemID}`;
  const timeoutInterval = import.meta.env.VITE_REQUEST_TIMEOUT;
  const maxAttempts = 5;
  let attemptCount = 0;

  while (attemptCount < maxAttempts) {
    const response = await fetch(endpoint, { method: "GET" });
    const data = await response.json();
    console.log(data);

    if (data.request_count > 0) {
      return data;
    }

    console.log(`Current Attempt Count: ${attemptCount}`);
    attemptCount++;

    await new Promise((resolve) => setTimeout(resolve, timeoutInterval));
  }
}
