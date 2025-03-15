import "beercss";
import "material-dynamic-colors";

import { useEffect, useState } from "preact/hooks";

import "./app.css";
import RequestForm from "./components/RequestForm";
import AppHeader from "./components/AppHeader";
import { getItemStatus } from "./utils/requestHelpers";
import UpStatusContainer from "../components/UpStatusContainer";

export function App() {
  const [itemID, setItemID] = useState();
  const [upStatus, setUpStatus] = useState();

  async function requestStatus() {
    const data = await getItemStatus(itemID);
    alert(JSON.stringify(data));
    setUpStatus(data);
  }

  useEffect(() => {
    if (itemID) {
      // requestStatus();
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
        <div className="medium-space"></div>
        <div className="container">
          {itemID && <UpStatusContainer upStatus={upStatus} />}
          <UpStatusContainer upStatus={upStatus} />
        </div>
      </main>
    </>
  );
}
