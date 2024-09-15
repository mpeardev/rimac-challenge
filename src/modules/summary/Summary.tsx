import { useContext } from "react";
import ButtonCircle from "../core/components/atoms/button-circle/ButtonCircle";
import Stepper from "../core/components/molecules/stepper/Stepper";
import QuoteLayout from "../core/layouts/QuoteLayout";
import classes from "./summary.module.scss";
import UserContext from "../core/states/user/user-context";
import { useNavigate } from "react-router-dom";

export default function Summary() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <QuoteLayout>
      <div className={classes.summary}>
        <Stepper />
        <div className={classes.summary__container}>
          <div
            className={classes.summary__return}
            onClick={() => navigate("/plans")}
          >
            <ButtonCircle
              icon="/rimac-challenge/icons/GlDown.svg"
              size="sm"
              active
            />
            <span>Volver</span>
          </div>

          <main>
            <h1>Resumen del seguro</h1>

            {user && (
              <div
                className={`${classes.summary__detailCard} ${classes.summary__card}`}
              >
                <div className={classes.summary__detailCardHead}>
                  <span>Precios calculados para:</span>
                  <div>
                    <img
                      src="/rimac-challenge/icons/gl_family-24x24.svg"
                      alt="icon"
                    />
                    <h4>
                      {user.name} {user.lastName}
                    </h4>
                  </div>
                </div>

                <div className={classes.summary__detailCardDetail}>
                  <div>
                    <h6>Responsable de pago</h6>
                    <p>DNI: {user.docNumber}</p>
                    <p>Celular: {user.phoneNumber}</p>
                  </div>
                  <div>
                    <h6>Plan elegido</h6>
                    <p>{user.plan?.namePlan}</p>
                    <p>Costo del Plan: ${user.plan?.pricePlan} al mes</p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </QuoteLayout>
  );
}
