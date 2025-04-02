import { PropagateLoader } from "react-spinners";

export default function UpStatusContainer({ upStatus }) {
  // upStatus = {
  //   request_count: 3,
  //   site_url: "https://google.com/",
  //   client_error_count: 10,
  //   server_error_count: 11,
  //   ok_count: 9,
  //   fail_count: 0,
  //   success_count: 19,
  // };
  // upStatus = undefined;

  const totalRequests = upStatus?.success_count + upStatus?.fail_count;
  const upPercentage = (upStatus?.success_count / totalRequests) * 100;
  let isSiteUp = upPercentage > 50;

  if (upStatus?.request_count) {
    const { ok_count, client_error_count, server_error_count } = upStatus;
    const maxCount = Math.max(ok_count, client_error_count, server_error_count);

    let statusMessage;

    if (maxCount == 0) {
      statusMessage = "the site may not exist or the URL may be incorrect";
    } else if (maxCount === ok_count) {
      statusMessage = "the site is performing fine";
    } else if (maxCount === client_error_count) {
      statusMessage = "there may be an error in your request to the site";
      isSiteUp = false;
    } else {
      statusMessage = "there is something wrong with the server";
      isSiteUp = false;
    }

    return (
      <article className="small-blur">
        <div className="center-align">
          <h5>Site is: {isSiteUp ? "Up" : "Down"}</h5>
          <p>
            {upPercentage}% of our requests to{" "}
            <code>
              <a
                href={upStatus.site_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {upStatus?.site_url}
              </a>
            </code>{" "}
            reached the site
          </p>
          <div className="space"></div>
          <img
            src={isSiteUp ? "/icons/green_tick.svg" : "/icons/red_x.svg"}
            className="circle large"
            alt="Status Indicator"
          />{" "}
        </div>
        <div className="space"></div>
        <p className="center-align">Our tests indicate that {statusMessage}</p>
        <div className="space"></div>
      </article>
    );
  } else {
    return (
      <article className="small-blur">
        <div className="center-align">
          <h5>Checking Site Status</h5>
          <div className="medium-space"></div>
          <PropagateLoader />
        </div>
        <div className="space"></div>
      </article>
    );
  }
}
