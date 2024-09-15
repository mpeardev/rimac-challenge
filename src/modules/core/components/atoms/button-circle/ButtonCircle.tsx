/* eslint-disable @typescript-eslint/no-explicit-any */
import classes from "./button-circle.module.scss";

interface ButtonProps {
  size?: "sm" | "md";
  icon: string;
  active?: boolean;
  onClick?: (prop?: any) => void;
}

const ButtonCircle: React.FC<ButtonProps> = ({
  size = "md",
  icon,
  active = false,
  onClick,
}) => {
  const sizeClass = size === "sm" ? classes.sm : classes.md;
  const activeClass = active === true ? classes.active : "";

  return (
    <button
      type="button"
      className={`${classes.button} ${sizeClass} ${activeClass}`}
      onClick={onClick}
    >
      <img src={icon} alt={`${icon}-icon`} />
    </button>
  );
};

export default ButtonCircle;
