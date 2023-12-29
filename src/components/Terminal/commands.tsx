import { TerminalStateProps } from ".";
import { getLines, CLICKABLE_LINKS } from "./lines";

const commands: {
  [commandName: string]:
    | string
    | ((
        lines: TerminalStateProps["lines"],
        args: string[],
      ) => TerminalStateProps["lines"]);
} = {
  help: (lines) => [
    ...lines,
    `Available commands are:`,
    ...Object.keys(commands).map((command) => ` - ${command}`),
  ],
  exit: "Goodbye... wait.. exit to where?",
  cls: () => [],
  open: (lines, args) => {
    const arg = args[0];

    if (!arg) {
      return [
        ...lines,
        "open: valid argument (link) not found! Please choose one of the above links",
      ];
    }

    const link = CLICKABLE_LINKS.find((item) =>
      item.children.toLowerCase().split(" - ")[0].includes(arg.toLowerCase()),
    );

    if (!link) {
      return [
        ...lines,
        `open: ${
          arg || ""
        }: Link not found! Please choose one of the above links (before the "-")`,
      ];
    }

    window.open(link.href, link.newTab ? "_blank" : "");

    return lines;
  },
};

export default commands;
