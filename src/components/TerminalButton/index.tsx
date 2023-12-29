import React from "react";
import terminalButtonStyles from "./terminalbutton.module.scss";
import clsx from "clsx";

interface TerminalButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  newTab?: boolean;
}

const TerminalButton = (props: TerminalButtonProps) => {
  const { newTab, ...rest } = props;

  return (
    <>
      <a
        target={newTab ? "_blank" : ""}
        {...rest}
        className={clsx(
          terminalButtonStyles.bb__terminalbutton,
          rest.className || "",
        )}
      >
        {props.children}
      </a>
      <br />
    </>
  );
};

export default TerminalButton;
