export default function isUrlValid(siteAddress) {
  try {
    const protocolPrefix = "https://";

    // prepend https if site has been submitted without it
    if (!siteAddress.startsWith(protocolPrefix)) {
      siteAddress = protocolPrefix + siteAddress;
    }

    checkURLRegex(siteAddress);

    const url = new URL(siteAddress).href;

    return {
      isValid: true,
      formattedAddress: url,
    };
  } catch (error) {
    console.log(error);
    return {
      isValid: false,
      formattedAddress: siteAddress,
    };
  }
}

function checkURLRegex(siteAddress) {
  const urlPattern =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  const passesRegex = urlPattern.test(siteAddress);

  if (!passesRegex) {
    throw new Error("URL does not pass regex validation");
  }
}
