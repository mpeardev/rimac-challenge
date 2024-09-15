import { useEffect, useState } from "react";
import classes from "./stepper.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonCircle from "../../atoms/button-circle/ButtonCircle";

export default function Stepper() {
  const [step, setStep] = useState<number | null>(1);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname) {
      const stepNumber =
        location.pathname === "/plans"
          ? 1
          : location.pathname === "/summary"
          ? 2
          : null;
      setStep(stepNumber);
    }
  }, [location]);

  return (
    <>
      <div className={classes.stepper}>
        <div className={classes.step}>
          <div
            className={`${classes.icon} ${step === 1 ? classes.active : ""}`}
          >
            1
          </div>
          <span
            className={`${classes.label}  ${step === 1 ? classes.active : ""}`}
          >
            Planes y coberturas
          </span>
        </div>
        <div className={classes.line}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={classes.step}>
          <div
            className={`${classes.icon} ${step === 2 ? classes.active : ""}`}
          >
            2
          </div>
          <span
            className={`${classes.label}  ${step === 2 ? classes.active : ""}`}
          >
            Resumen
          </span>
        </div>
      </div>

      {location.pathname === "/plans" && (
        <div className={classes.steppermb}>
          <div className={classes.steppermb__container}>
            <ButtonCircle
              icon="/src/assets/icons/GlLeft.svg"
              onClick={() => navigate("/")}
            />
            <div className={classes.steppermb__main}>
              <span>Paso {step} de 2</span>
              <div className={classes.steppermb__mainBar}>
                <div style={step === 2 ? { width: "100%" } : {}}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
