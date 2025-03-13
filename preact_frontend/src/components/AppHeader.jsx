export default function AppHeader() {
  return (
    <header className="round white-container">
      <nav>
        <a
          href="https://rua-iri.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="circle transparent">
            <img
              src="https://rua-iri.com/apple-touch-icon.png"
              alt=""
              className="responsive"
            />
          </button>
        </a>
        <h4 className="max center-align">What's Up Check</h4>
        <a
          href="https://github.com/rua-iri/whats_up_check"
          target="_blank"
          rel="noopener noreferrer"
        >
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
