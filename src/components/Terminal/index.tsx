import React from 'react';

import { TextLineInput } from 'components';
import { ITextLineInputRef } from 'components/TextLineInput';
import TerminalTextRenderer from 'helpers/TerminalTextRenderer';

import getLines from './lines';
import commands from './commands';

interface ITerminalState {
    lines: Array<JSX.Element | string>;
}

class Terminal extends React.PureComponent<{}, ITerminalState> {
    public newLine: JSX.Element;
    private terminalRef: HTMLDivElement | null = null;
    private lastInputRef: ITextLineInputRef | null = null;

    constructor(props: {}) {
        super(props);

        this.newLine = this.getNewLine();

        this.state = {
            lines: this.getInitialLines(),
        }

        window.addEventListener('mousemove', this.aliveTerminalEffect);
    }
    
    public render() {
        return (
            <div 
                className="bb__terminal"
                ref={(ref) => this.terminalRef = ref} // using state mangement for 60+fps animations are react's enemy
            >
                <TerminalTextRenderer
                    text={this.state.lines}
                    onTextRender={this.onTextLineRender}
                />
            </div>
        );
    }

    public componentWillUnmount() {
        window.removeEventListener('mousemove', this.aliveTerminalEffect);
    }

    public onTextLineRender = () => {
        this.terminalRef?.scrollTo(0, this.terminalRef?.scrollHeight);
    }

    public getNewLine = () => React.cloneElement(
        <TextLineInput
            onSubmit={this.onTextSubmit}
            ref={ref => this.lastInputRef = ref}
            key={new Date().toISOString()}
        />
    );
    
    public getInitialLines = () => [ ...getLines(), this.getNewLine() ];

    private onTextSubmit = (value: string) => {
        if (this.lastInputRef) {
            this.lastInputRef.setDisabled();
        }

        let bufferedFnVal: () => void;
        const afterStateCallback: (bufferedFn: () => void) => void = 
            bufferedFn => bufferedFnVal = bufferedFn;

        this.setState({
            lines: [ ...this.state.lines, this.verifyCommand(value, afterStateCallback), this.newLine ],
        }, () => {
            bufferedFnVal && bufferedFnVal()
        });
    }

    private verifyCommand = (input: string, afterStateCallback: (bufferedFn: () => void) => void): string => {
        const [ command, ...args ] = input.split(' ');
        const foundCommand = commands[command];

        if (!input) { return ''; }
        if (!foundCommand) { return `-bash: ${input}: command not found`; }

        return typeof foundCommand === 'string'
            ? foundCommand
            : foundCommand.bind(this)(args, afterStateCallback) || '';
    }

    private aliveTerminalEffect = (event: MouseEvent) => {
        const { pageX, pageY } = event;
        
        if (!this.terminalRef) { return; }
        const damper = 50;
        const out = {
            x: (pageX - (window.outerWidth / 2)) / damper,
            y: (pageY - (window.outerHeight / 2)) / damper,
        }

        this.terminalRef.style.transform = `perspective(2000px) rotateX(${-out.y}deg) rotateY(${out.x}deg)`;
    }
}

export default Terminal;