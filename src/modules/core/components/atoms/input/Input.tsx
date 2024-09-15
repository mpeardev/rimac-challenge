/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FocusEvent, useEffect } from "react";
import classes from "./input.module.scss";

interface InputProps {
  inputType: "string" | "number";
  label: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  error?: any;
  validators?: any;
}

const Input: React.FC<InputProps> = ({
  inputType,
  label,
  inputValue,
  onInputChange,
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
    if (!e.target.value) setIsFilled(false);
  };

  return (
    <div className={`${classes.input} ${isFilled ? classes.filled : ""}`}>
      <input
        type={inputType}
        className={error ? classes.inputError : ""}
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        onBlur={handleBlur}
        {...validators}
      />
      <label className={`${classes.label} ${error ? classes.labelError : ""}`}>
        {label}
      </label>
    </div>
  );
};

export default Input;
