/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FocusEvent, ChangeEvent, useEffect } from "react";
import classes from "./selector-input.module.scss";

interface SelectorInputProps {
  inputType: "string" | "number";
  label: string;
  inputValue: string;
  selectorValue: string;
  selectorOptions?: Array<SelectorOption>;
  onInputChange: (value: string) => void;
  onSelectorChange: (value: string) => void;
  error?: any;
  validators?: any;
}

interface SelectorOption {
  name: string;
  value: string;
}

const SelectorInput: React.FC<SelectorInputProps> = ({
  inputType,
  label,
  inputValue,
  selectorValue,
  selectorOptions,
  onInputChange,
  onSelectorChange,
  error,
  validators,
}) => {
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (inputValue) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [inputValue]);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsFilled(false);
    }
  };

  return (
    <div
      className={`${classes.selectorInput} ${isFilled ? classes.filled : ""}`}
    >
      <div>
        <select
          value={selectorValue}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            onSelectorChange(e.target.value)
          }
        >
          {selectorOptions &&
            selectorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
        </select>
      </div>
      <div className={classes.input}>
        <input
          type={inputType}
          className={`${classes.inputField} ${error ? classes.inputError : ""}`}
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onBlur={handleBlur}
          {...validators}
        />
        <label
          className={`${classes.label} ${error ? classes.labelError : ""}`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default SelectorInput;
