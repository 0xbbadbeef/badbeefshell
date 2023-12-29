import React, { useCallback, useEffect, useRef, useState } from "react";

import { TextLineInput } from "~/components";
import { TextLineInputRef } from "~/components/TextLineInput";
import TerminalTextRenderer from "~/helpers/TerminalTextRenderer";

import { getLines } from "./lines";
import commands from "./commands";

import terminalClasses from "./terminal.module.scss";

export interface TerminalStateProps {
  lines: Array<JSX.Element | string>;
}

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const lastInputRef = useRef<TextLineInputRef>(null);

  const processCommand = useCallback(
    (
      input: string,
      lines: TerminalStateProps["lines"],
    ): TerminalStateProps["lines"] => {
      const [command, ...args] = input.split(" ");
      const foundCommand = commands[command];

      if (!input) return [...lines, ""];

      if (!foundCommand)
        return [...lines, `-bash: ${input}: command not found`];

      return typeof foundCommand === "string"
        ? [...lines, foundCommand]
        : foundCommand(lines, args);
    },
    [],
  );

  const onTextSubmit = useCallback(
    (value: string) => {
      lastInputRef.current?.setDisabled();

      setLines((currentLines) => [
        ...processCommand(value, currentLines),
        <TextLineInput
          onSubmit={onTextSubmit}
          ref={lastInputRef}
          key={new Date().toISOString()}
        />,
      ]);
    },
    [processCommand],
  );

  const [lines, setLines] = useState([
    ...getLines(),
    <TextLineInput
      onSubmit={onTextSubmit}
      ref={lastInputRef}
      key={new Date().toISOString()}
    />,
  ]);

  const onTextLineRender = () => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  };

  const aliveTerminalEffect = useCallback((event: MouseEvent) => {
    const { pageX, pageY } = event;
    const currentTerminalRef = terminalRef.current;

    if (!currentTerminalRef) {
      return;
    }
    const damper = 50;
    const out = {
      x: (pageX - window.outerWidth / 2) / damper,
      y: (pageY - window.outerHeight / 2) / damper,
    };

    currentTerminalRef.style.transform = `perspective(2000px) rotateX(${-out.y}deg) rotateY(${
      out.x
    }deg)`;
  }, []);

  useEffect(
    function attachMouseMove() {
      window.addEventListener("mousemove", aliveTerminalEffect);

      return () => window.removeEventListener("mousemove", aliveTerminalEffect);
    },
    [aliveTerminalEffect],
  );

  return (
    <div className={terminalClasses.bb__terminal} ref={terminalRef}>
      <TerminalTextRenderer lines={lines} onTextRender={onTextLineRender} />
    </div>
  );
};

export default Terminal;
