import { PropagateLoader } from "react-spinners";

export default function UpStatusContainer({ upStatus }) {
  upStatus = {
    request_count: 1,
    site_url: "https://google.com/",
    fail_count: 0,
    success_count: 3,
  };
  // upStatus = undefined;

  return (
    <article className="small-blur">
      <div>
        <div>{JSON.stringify(upStatus)}</div>
      </div>

      <div className="center-align">
        {upStatus ? (
          <div></div>
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
