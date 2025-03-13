import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import RequestForm from "./components/RequestForm";

import beercss from "beercss";
import materialDynamicColors from "material-dynamic-colors";
import AppHeader from "./components/AppHeader";

export function App() {

  return (
    <>
      <main className="responsive main-container">
        <AppHeader />
        <div className="medium-space"></div>
        <div className="container">
          <RequestForm />
        </div>
      </main>
    </>
  );
}
