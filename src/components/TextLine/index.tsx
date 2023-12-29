import { useState, useEffect } from "react";
import clsx from "clsx";

import textlineStyles from "./textline.module.scss";

interface TextLineProps extends Partial<React.HTMLAttributes<HTMLSpanElement>> {
  text: string | JSX.Element;
}

export default function TextLine(props: TextLineProps) {
  const { text, ...rest } = props;

  return typeof text === "string" ? (
    <span
      {...rest}
      className={clsx(textlineStyles.bb__textline, rest.className)}
    >
      {text}
    </span>
  ) : (
    text
  );
}
