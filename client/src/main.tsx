import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppLoader from "./components/Loader";
import "./index.css";

function Root() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      {showLoader && <AppLoader onFinish={() => setShowLoader(false)} />}
      <App />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
