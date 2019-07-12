import React, { useState, memo, useEffect } from 'react';

interface TextLine extends Partial<React.HTMLAttributes<HTMLSpanElement>> {
    text: string | JSX.Element;
    delay: number;
    onTextRender: () => void;
}

const TextLine: React.SFC<TextLine> = memo((props: TextLine) => {
    const { text, delay, onTextRender, ...rest} = props;

    const [ isReady, setIsReady ] = useState(false);

    const timeout = setTimeout(() => setIsReady(true), delay);

    useEffect(() => {
        if (isReady) {
            onTextRender();
        }

        return () => clearTimeout(timeout);
    }, [isReady, onTextRender, timeout]);

    return isReady ? (
        (typeof text === 'string') 
            ? <span     
                {...rest}
                className={`bb__textline ${rest.className || ''}`}
            >
                {text}
            </span> 
            : text
    ) : null;
})

export default TextLine;