import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { USER_STRING, KEYS } from "~/consts";

import textlineInputStyles from "./textlineinput.module.scss";
import clsx from "clsx";

interface TextLineInputProps {
  onSubmit: (value: string, event: KeyboardEvent) => void;
}

export interface TextLineInputRef {
  setDisabled: () => void;
}

export default forwardRef(function TextLineInput(
  props: TextLineInputProps,
  ref: React.Ref<TextLineInputRef>,
) {
  const [value, setValue] = useState("");
  const [editable, setEditable] = useState(true);

  useImperativeHandle(ref, () => ({
    setDisabled: () => {
      setEditable(false);
    },
  }));

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { keyCode, key } = event;
      // event.stopPropagation();
      // event.preventDefault();

      switch (true) {
        case keyCode === KEYS.ENTER_KEY:
          props.onSubmit(value, event);
          break;
        case keyCode === KEYS.BACKSPACE_KEY:
          setValue((currentValue) =>
            currentValue.slice(0, Math.max(0, currentValue.length - 1)),
          );
          break;
        case (keyCode >= KEYS.A_KEY && keyCode <= KEYS.Z_KEY) ||
          (keyCode >= KEYS.ZERO_KEY && keyCode <= KEYS.NINE_KEY) ||
          keyCode === KEYS.SPACE_KEY:
          setValue((currentValue) => currentValue + key);
          break;
      }
    },
    [props, value],
  );

  useEffect(
    function attachKeyboardListener() {
      if (editable) window.addEventListener("keydown", onKeyDown);

      return () => window.removeEventListener("keydown", onKeyDown);
    },
    [editable, onKeyDown],
  );

  return (
    <div className={textlineInputStyles.bb__textlineinput}>
      <span>
        {USER_STRING()}
        <span
          className={clsx(
            textlineInputStyles.bb__textlineinput__input,
            editable && textlineInputStyles["bb__textlineinput__input--active"],
          )}
        >
          {value}{" "}
        </span>
      </span>
    </div>
  );
});
