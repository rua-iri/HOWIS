export default function AppHeader() {
  return (
    <header className="round container">
      <nav>
        <a
          href="https://rua-iri.com"
          target="_blank"
          rel="noopener noreferrer"
          className="circle transparent"
        >
          <img
            width={40}
            height={40}
            src="/icons/rua-iri.webp"
            alt="rua-iri logo"
            className="responsive"
          />
        </a>
        <a href="/" className="max center-align header-title">
          <h3>HOWIS</h3>
        </a>
        <a
          href="https://github.com/rua-iri/HOWIS"
          target="_blank"
          rel="noopener noreferrer"
          className="circle transparent"
        >
          <img
            width={40}
            height={40}
            src="https://github.com/favicon.ico"
            alt="GitHub Logo"
            className="responsive"
          />
        </a>
      </nav>
    </header>
  );
}
