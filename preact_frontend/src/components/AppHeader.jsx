export default function AppHeader() {
  return (
    <header className="round">
      <nav>
        <h5 className="max center-align">What's Up Check</h5>
        <a href="https://github.com/rua-iri/whats_up_check" target="_blank" rel="noopener noreferrer">
          <button className="circle transparent">
            <img
              src="https://github.com/favicon.ico"
              alt=""
              className="responsive"
            />
          </button>
        </a>
      </nav>
    </header>
  );
}
