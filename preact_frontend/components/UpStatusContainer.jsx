export default function UpStatusContainer({ upStatus }) {
  upStatus = {
    request_count: 1,
    site_url: "https://google.com/",
    fail_count: 0,
    success_count: 3,
  };
  upStatus = undefined;

  return (
    <article className="small-blur">
      <div>adfsasdf</div>
      <div>{JSON.stringify(upStatus)}</div>
    </article>
  );
}
