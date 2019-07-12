import React, { useImperativeHandle, useRef, useState } from 'react';

import { USER_STRING, KEYS } from 'consts';

interface ITextLineInput {
    onSubmit: (value: string, event: KeyboardEvent) => void;
}

export interface ITextLineInputRef {
    setDisabled: () => void;
}

const TextLineInput = React.forwardRef((props: ITextLineInput, ref: React.Ref<ITextLineInputRef>) => {
    const [ value, setValue ] = useState('');
    const [ editable, setEditable ] = useState(true);
    const isListening = useRef(false);

    useImperativeHandle(ref, () => ({
        setDisabled: () => {
            setEditable(false);
            toggleInputListener(false);
        }
    }));

    const onKeyDown = (event: KeyboardEvent) => {
        const { keyCode, key } = event;
        toggleInputListener(false);
        event.stopPropagation();
        event.preventDefault();

        switch (true) {
            case keyCode === KEYS.ENTER_KEY:
                props.onSubmit(value, event);
                break;
            case keyCode === KEYS.BACKSPACE_KEY:
                setValue(value.slice(0, Math.max(0, value.length) - 1));
                toggleInputListener(true);
                break;
            case (keyCode >= KEYS.A_KEY && keyCode <= KEYS.Z_KEY)
                || (keyCode >= KEYS.ZERO_KEY && keyCode <= KEYS.NINE_KEY)
                || (keyCode === KEYS.SPACE_KEY):
                setValue(value + key);
                break;
            default:
                toggleInputListener(true);
        }
    }

    const toggleInputListener = (shouldListen: boolean) => {
        if (shouldListen === isListening.current) { return; }

        isListening.current = shouldListen;

        shouldListen 
            ? window.addEventListener('keydown', onKeyDown)
            : window.removeEventListener('keydown', onKeyDown);
    }

    if (editable) {
        toggleInputListener(true);
    }

    const baseClass = 'bb__textlineinput__input';
    return (
        <div className='bb__textlineinput'>
            <span>
                {USER_STRING()}
                <span className={`${baseClass}${editable ? ` ${baseClass}--active` : ''}`}>
                    {value} {/* we dont use contentEditable to prevent standard input controls and cursor positioning */}
                </span>
            </span>
        </div>
    );
});

export default TextLineInput;