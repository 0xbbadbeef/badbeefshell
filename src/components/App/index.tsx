import { Terminal } from "~/components";

import appClasses from "./app.module.scss";
import clsx from "clsx";

export default function AppPage() {
  return (
    <div className={clsx(appClasses.bb__app, appClasses.flicker, "awd")}>
      <Terminal />
    </div>
  );
}
