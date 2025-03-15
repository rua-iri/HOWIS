export default function AppHeader() {
  return (
    <header className="round container">
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
        <h3 className="max center-align header-title">What's Up Check</h3>
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
