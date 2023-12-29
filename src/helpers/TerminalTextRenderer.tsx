import React, { useEffect, useRef, useState } from "react";
import { TextLine } from "~/components";

const CHARACTER_TIME = 15; // ms

interface TerminalTextRendererProps {
  lines: Array<string | JSX.Element>;
  onTextRender: () => void;
}

const TerminalTextRenderer = (props: TerminalTextRendererProps) => {
  const { lines, onTextRender } = props;

  const [renderedLines, setRenderedLines] = useState<JSX.Element[]>([]);
  const previousLines = useRef(lines);

  useEffect(
    function clearLines() {
      if (lines.length < previousLines.current.length) {
        setRenderedLines([]);
      }

      previousLines.current = lines;
    },
    [lines],
  );

  useEffect(
    function appendLine() {
      if (renderedLines.length >= lines.length) return;

      const currentLineIndex = renderedLines.length;
      const currentLine = lines[currentLineIndex];

      const previousLineIndex = currentLineIndex - 1 ?? 0;
      const previousLine = lines[previousLineIndex];

      const delay =
        typeof previousLine === "string"
          ? previousLine.length * CHARACTER_TIME
          : 0;

      const timeout = setTimeout(
        () =>
          setRenderedLines((currentLines) => [
            ...currentLines,
            <TextLine
              text={currentLine}
              key={currentLineIndex}
              style={{
                animationDuration: `${
                  typeof currentLine === "string"
                    ? currentLine.length * CHARACTER_TIME
                    : 0
                }ms`,
              }}
            />,
          ]),
        delay,
      );

      return () => clearTimeout(timeout);
    },
    [lines, onTextRender, renderedLines, renderedLines.length],
  );

  useEffect(
    function onTextRendered() {
      onTextRender();
    },
    [onTextRender, renderedLines],
  );

  return renderedLines;
};

export default TerminalTextRenderer;
