import { useState } from "preact/hooks";
import preactLogo from "../assets/preact.svg";
import isUrlValid from "../utils/urlHelpers";

export default function RequestForm() {
  const [isFormError, setIsFormError] = useState(false);
  const [websiteAddress, setWebsiteAddress] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setIsFormError(false);

    const validUrlData = isUrlValid(websiteAddress);

    console.log(JSON.stringify(validUrlData));

    if (!validUrlData.isValid) {
      setIsFormError(true);
      return;
    }
  }

  return (
    <article className="small-blur">
      {isFormError && "asdfasdf"}

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
        </fieldset>
      </form>
    </article>
  );
}
