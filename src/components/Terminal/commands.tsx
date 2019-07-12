import Terminal from ".";
import { CLICKABLE_LINKS } from "./lines";

const commands: { [commandName: string]: string | ((args: string[], afterStateCallback: (bufferedFn: () => void) => void) => string | void) } = {
    help: () => Object.keys(commands).join(', '),
    exit: 'Goodbye... actually no you can stay here!',
    cls: function(this: Terminal, args, afterStateCallback) { 
        afterStateCallback(() => this.setState({ lines: [ this.getNewLine() ] })) 
    },
    reboot: function(this: Terminal, args, afterStateCallback) { 
        afterStateCallback(() => this.setState({ lines: this.getInitialLines() })) 
    },
    open: (args) => {
        const arg = args[0];

        const link = CLICKABLE_LINKS.find(item => 
            item.children.toLowerCase().includes(arg.toLowerCase())
        )

        if (!link) { return `open: ${arg || ''}: Link not found! Please choose one of the above links` }

        window.open(link.href, link.newTab ? '_blank' : '');
    }
}

export default commands;