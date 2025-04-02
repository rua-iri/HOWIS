import { render } from "preact";
import "./index.css";
import { App } from "./app.jsx";

const isEnvProd = import.meta.env.PROD;

if (isEnvProd) {
  console.log = () => {};
}

render(<App />, document.getElementById("app"));
