import { useEffect, useRef, useState } from "preact/hooks";
import sendIcon from "/icons/send.svg";
import isUrlValid from "../utils/urlHelpers";
import { sendSite } from "../utils/requestHelpers";

export default function RequestForm({ setItemID, setUpStatus }) {
  const [isFormError, setIsFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [websiteAddress, setWebsiteAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textInputRef = useRef();

  async function handleSubmit(event) {
    console.log(isSubmitting);
    try {
      event.preventDefault();

      if (isSubmitting) return;

      setIsFormError(false);
      setIsSubmitting(true);
      setItemID();
      setUpStatus();

      const validUrlData = isUrlValid(websiteAddress);

      console.log(JSON.stringify(validUrlData));

      if (!validUrlData.isValid) {
        setIsFormError(true);
        setErrorMessage("Invalid URL");
        return;
      }

      const data = await sendSite(validUrlData.formattedAddress);

      if (data.status == "success") {
        data && setItemID(data.id);
      }
    } catch (error) {
      setErrorMessage("Something Went Wrong Submitting the Form");
      setIsFormError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  return (
    <article className="blur">
      <h3>Request a Website</h3>
      <p>
        Check whether a given website is up right now by sending a request from
        multiple different clients
      </p>
      <form onSubmit={(event) => handleSubmit(event)}>
        <fieldset>
          <legend>Enter your website's address below</legend>
          <div className="row">
            <div className="max">
              <nav className="no-space">
                <div className="field border label max left-round">
                  {isFormError && (
                    <span class="error">Error: {errorMessage}</span>
                  )}
                  <input
                    type="text"
                    name="siteAddress"
                    id="siteAddress"
                    ref={textInputRef}
                    value={websiteAddress}
                    onChange={(e) => setWebsiteAddress(e.target.value)}
                  />
                  <label htmlFor="siteAddress">Address</label>
                </div>
                <button
                  className="small-elevate large right-round"
                  disabled={!websiteAddress || isSubmitting}
                >
                  <img
                    width={48}
                    height={48}
                    src={sendIcon}
                    alt="Send Icon"
                    className="responsive"
                  />
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
