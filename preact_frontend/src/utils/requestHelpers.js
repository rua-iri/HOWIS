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
  const timeoutInterval = 1000;
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
