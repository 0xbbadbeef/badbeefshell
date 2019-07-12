import React, { useRef } from 'react';
import { TextLine } from 'components';

interface ITerminalTextRenderer {
    text: Array<string | JSX.Element>;
    onTextRender: () => void;
}

const TerminalTextRenderer: React.SFC<ITerminalTextRenderer> = (props: ITerminalTextRenderer) => {
    const { text, onTextRender } = props;
    const prevProps = useRef<ITerminalTextRenderer['text']>([]);

    const output = text.reduce((acc, line, index) => {
        const duration = typeof line === 'string'
                            ? line.length * 15
                            : 0;

        acc.items.push(
            <TextLine 
                text={line as string}
                delay={acc.currentDelay}
                key={index}
                style={{ animationDuration: `${duration}ms` }}
                onTextRender={onTextRender}
            />
        );

        if (index > prevProps.current.length) {
            acc.currentDelay += duration;
        }

        return acc;
    }, { items: [] as Array<string | JSX.Element>, currentDelay: 0 });

    prevProps.current = output.items;

    return <>{output.items}</>;
}

export default TerminalTextRenderer;