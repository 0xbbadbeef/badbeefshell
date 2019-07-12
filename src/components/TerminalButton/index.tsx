import React from 'react';

interface ITerminalButton extends React.AnchorHTMLAttributes<HTMLAnchorElement>  {
    newTab?: boolean;
}

const TerminalButton: React.SFC<ITerminalButton> = (props: ITerminalButton) => {
    const { newTab, ...rest } = props;

    return (
        <a
            target={newTab ? '_blank' : ''}
            {...rest}
            className={`bb__terminalbutton ${props.className || ''}`}
        >
            {props.children}
        </a>
    )
}

export default TerminalButton;