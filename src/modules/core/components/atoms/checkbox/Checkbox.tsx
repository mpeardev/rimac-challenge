/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import classes from "./checkbox.module.scss";

type CheckboxProps = {
  id?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  error?: any;
  validators?: any;
};

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked = false,
  onChange,
  error,
  validators,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className={classes.checkboxContainer}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleCheckboxChange}
        className={classes.checkboxInput}
        {...validators}
      />
      <span
        className={`${classes.customCheckbox} ${
          error ? classes.customCheckboxError : ""
        }`}
      >
        {checked && (
          <img src="/src/assets/icons/check-checkbox.svg" alt="checked" />
        )}
      </span>
    </div>
  );
};

export default Checkbox;
