import { useState } from "preact/hooks";
import preactLogo from "../assets/preact.svg";
import isUrlValid from "../utils/urlHelpers";
import { sendSite } from "../utils/requestHelpers";

export default function RequestForm({ setItemID }) {
  const [isFormError, setIsFormError] = useState(false);
  const [websiteAddress, setWebsiteAddress] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setIsFormError(false);

    const validUrlData = isUrlValid(websiteAddress);

    console.log(JSON.stringify(validUrlData));

    if (!validUrlData.isValid) {
      setIsFormError(true);
      return;
    }

    const data = await sendSite(validUrlData.formattedAddress);

    if (data.status == "success") {
      data && setItemID(data.id);
    }
  }

  return (
    <article className="small-blur">
      <h5>Request a Website</h5>
      <p>
        Check whether a given website is up right now by sending a request from
        multiple different global regions
      </p>
      <form onSubmit={(event) => handleSubmit(event)}>
        <fieldset>
          <legend>Enter your website's address below</legend>
          <div className="row">
            <div className="max">
              <nav className="no-space">
                <div className="field border label max left-round">
                  {isFormError && <span class="error">Invalid URL</span>}
                  <input
                    type="text"
                    name="siteAddress"
                    id="siteAddress"
                    value={websiteAddress}
                    onChange={(e) => setWebsiteAddress(e.target.value)}
                  />
                  <label htmlFor="siteAddress">Address</label>
                </div>
                <button
                  className="small-elevate large right-round"
                  disabled={!websiteAddress}
                >
                  <img src={preactLogo} alt="" className="responsive" />
                  <span>Send</span>
                </button>
              </nav>
            </div>
          </div>
          <div className="space"></div>
        </fieldset>
      </form>
    </article>
  );
}
