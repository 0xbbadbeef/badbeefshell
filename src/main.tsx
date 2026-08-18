import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppPage from "~/components/App";

import "./styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppPage />
  </StrictMode>,
);
