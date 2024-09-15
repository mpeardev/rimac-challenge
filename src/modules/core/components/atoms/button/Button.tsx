/* eslint-disable @typescript-eslint/no-explicit-any */
import classes from "./button.module.scss";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text: string;
  size?: "sm" | "md";
  color?: "primary" | "secondary";
  width?: "fit" | "max";
  onClick?: (prop?: any) => void;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  text,
  size = "md",
  color = "primary",
  width = "fit",
  onClick,
}) => {
  const sizeClass = size === "sm" ? classes.sm : classes.md;
  const colorClass = color === "primary" ? classes.primary : classes.secondary;
  const widthClass = width === "max" ? classes.max : classes.fit;

  return (
    <button
      type={type}
      className={`${classes.button} ${sizeClass} ${colorClass} ${widthClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
