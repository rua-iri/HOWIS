import "beercss";
import "material-dynamic-colors";

import { useEffect, useState } from "preact/hooks";

import "./app.css";
import RequestForm from "./components/RequestForm";
import AppHeader from "./components/AppHeader";
import { getItemStatus } from "./utils/requestHelpers";

export function App() {
  const [itemID, setItemID] = useState();

  useEffect(() => {
    if (itemID) {
      getItemStatus(itemID);
    }
  }, [itemID]);

  return (
    <>
      <main className="responsive">
        <AppHeader />
        <div className="medium-space"></div>
        <div className="container">
          <RequestForm setItemID={setItemID} />
        </div>
      </main>
    </>
  );
}
