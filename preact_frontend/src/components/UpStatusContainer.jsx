import { PropagateLoader } from "react-spinners";

export default function UpStatusContainer({ upStatus }) {
  // upStatus = {
  //   request_count: 1,
  //   site_url: "https://google.com/",
  //   fail_count: 3,
  //   success_count: 3,
  // };
  // // upStatus = undefined;

  const totalRequests = upStatus?.success_count + upStatus?.fail_count;
  const upPercentage = (upStatus?.success_count / totalRequests) * 100;
  const isSiteUp = upPercentage > 50;

  return (
    <article className="small-blur">
      <div className="center-align">
        {upStatus?.request_count ? (
          <>
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
              were successful
            </p>
            <div className="space"></div>
            <img
              src={isSiteUp ? "/icons/green_tick.svg" : "/icons/red_x.svg"}
              className="circle large"
              alt="Status Indicator"
            />
          </>
        ) : (
          <>
            <h5>Checking Site Status</h5>
            <div className="medium-space"></div>
            <PropagateLoader />
          </>
        )}
      </div>
      <div className="space"></div>
    </article>
  );
}
