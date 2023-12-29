/* eslint-disable react/jsx-key */
import React from "react";

import { TerminalButton } from "~/components";
import { USER_STRING } from "~/consts";

const currentTime = new Date();

interface ClickableLinkProps {
  href: string;
  children: string;
  newTab?: boolean;
}

export const CLICKABLE_LINKS: ClickableLinkProps[] = [
  {
    href: "https://github.com/0xbbadbeef",
    children: "GitHub",
    newTab: true,
  },
  {
    href: "https://github.com/0xbbadbeef/badbeefshell",
    children: "Source - (of this page)",
    newTab: true,
  },
  {
    href: "https://github.com/0xbbadbeef/countriesapp",
    children: "Countries - CRA app",
    newTab: true,
  },
];

export const getLines = () => [
  "Initialising bbadbeef terminal..",
  "Done!",
  <hr />,
  "> login as: root",
  "> root@bbadbeef's password: ********",
  <br />,
  "Determining credentials",
  <hr />,
  <br />,
  `Last login: ${currentTime.toDateString()} ${currentTime.toLocaleTimeString()}`,
  <br />,
  `${USER_STRING()} cd intro/`,
  `${USER_STRING("/intro")} cat README.md && cd ~`,
  "Welcome to badbeef.io! This is the home for all things John.",
  "You can find various projects that I've done here.",
  <br />,
  "What would you like to look at? (Clickable!)",
  <br />,
  ...CLICKABLE_LINKS.map((item) => <TerminalButton {...item} />),
  <br />,
  "Or you could start typing your own command here, get started with 'help'!",
];
