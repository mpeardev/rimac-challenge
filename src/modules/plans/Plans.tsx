/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import ButtonCircle from "../core/components/atoms/button-circle/ButtonCircle";
import Button from "../core/components/atoms/button/Button";
import Stepper from "../core/components/molecules/stepper/Stepper";
import QuoteLayout from "../core/layouts/QuoteLayout";
import classes from "./plans.module.scss";
import UserContext from "../core/states/user/user-context";
import { useNavigate } from "react-router-dom";
import { IPlan, IPlanData, UserOptionType } from "../core/interfaces/plans";
import { IUser } from "../core/interfaces/user";

export default function Plans() {
  const { user, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const [userOption, setUserOption] = useState<UserOptionType | null>();
  const [plans, setPlans] = useState<IPlan[]>();

  const getPlansList = async () => {
    try {
      const response = await fetch(
        "https://rimac-front-end-challenge.netlify.app/api/plans.json"
      );
      const data = await response.json();
      if (!data && !user) return;
      filterPlansByDate(data.list, calculateAge(user!.birthDay));
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const calculateAge = (birth: string): number => {
    const [day, month, year] = birth.split("-").map(Number);
    const today = new Date();
    // si el mes actual es menor que el mes de nacimiento y si estamos en el mes de cumpleaños, pero el dia actual es menor que el dia de nacimiento
    const age =
      today.getFullYear() -
      year -
      +(
        today.getMonth() + 1 < month ||
        (today.getMonth() + 1 === month && today.getDate() < day)
      );
    return age;
  };

  // funcion para filtrar los planes cuyo birthDay >= edad del usuario
  const filterPlansByDate = (plans: Array<IPlan>, age: number) => {
    if (!plans || !age) return;
    const filteredPlans = plans.filter((plan: IPlan) => plan.age >= age);
    if (filteredPlans) setPlans(filteredPlans);
  };

  const getPriceCalculated = (price: number): string => {
    let priceCalculated;
    if (userOption === "forSomeone") {
      priceCalculated = (price * 0.95).toFixed(2);
    } else priceCalculated = price.toFixed(2);
    return priceCalculated;
  };

  const planSelected = (data: IPlanData) => {
    if (!data) return;
    const userData: IUser = {
      name: user?.name ?? "",
      lastName: user?.lastName ?? "",
      birthDay: user?.birthDay ?? "",
      docType: user?.docType ?? "",
      docNumber: user?.docNumber ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      plan: {
        namePlan: data.namePlan,
        pricePlan: data.pricePlan,
      },
    };
    setUserData(userData);
    navigate("/summary");
  };

  useEffect(() => {
    getPlansList();
  });

  useEffect(() => {
    // limpieza inicial de plan
    setUserData({
      name: user?.name ?? "",
      lastName: user?.lastName ?? "",
      birthDay: user?.birthDay ?? "",
      docType: user?.docType ?? "",
      docNumber: user?.docNumber ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      plan: null,
    });
  }, []);

  return (
    <QuoteLayout>
      <div className={classes.plans}>
        <Stepper />
        <div className={classes.plans__container}>
          <div className={classes.plans__return} onClick={() => navigate("/")}>
            <ButtonCircle
              icon="/src/assets/icons/GlDown.svg"
              size="sm"
              active
            />
            <span>Volver</span>
          </div>

          {user && (
            <>
              <main>
                <div className={classes.plans__head}>
                  <h1>{user.name} ¿Para quién deseas cotizar?</h1>
                  <p>
                    Selecciona la opción que se ajuste más a tus necesidades.
                  </p>
                </div>

                <div className={classes.plans__optionCards}>
                  <div
                    className={`${classes.plans__card} ${
                      userOption === "forMe" ? classes.plans__cardActive : ""
                    }`}
                    onClick={() => setUserOption("forMe")}
                  >
                    <div
                      className={`${classes.plans__cardCheck} ${
                        userOption === "forMe" ? classes.plans__cardActive : ""
                      }`}
                    >
                      <div>
                        {userOption === "forMe" && (
                          <img
                            src="/src/assets/icons/check-radius.svg"
                            alt="check"
                          />
                        )}
                      </div>
                    </div>
                    <div className={classes.plans__cardContent}>
                      <img
                        src="/src/assets/icons/IcProtectionLight.svg"
                        alt="image-card"
                      />
                      <h4>Para mi</h4>
                      <p>
                        Cotiza tu seguro de salud y agrega familiares si así lo
                        deseas.
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${classes.plans__card} ${
                      userOption === "forSomeone"
                        ? classes.plans__cardActive
                        : ""
                    }`}
                    onClick={() => setUserOption("forSomeone")}
                  >
                    <div
                      className={`${classes.plans__cardCheck} ${
                        userOption === "forSomeone"
                          ? classes.plans__cardActive
                          : ""
                      }`}
                    >
                      <div>
                        {userOption === "forSomeone" && (
                          <img
                            src="/src/assets/icons/check-radius.svg"
                            alt="check"
                          />
                        )}
                      </div>
                    </div>
                    <div className={classes.plans__cardContent}>
                      <img
                        src="/src/assets/icons/IcAddUserLight.svg"
                        alt="image-card"
                      />
                      <h4>Para alguien más</h4>
                      <p>Realiza una cotización para alguien diferente a ti.</p>
                    </div>
                  </div>
                </div>
              </main>

              {userOption && plans && (
                <div className={classes.plans__planCards}>
                  {plans.map((plan) => (
                    <div key={plan.name} className={`${classes.plans__card}`}>
                      <div className={classes.plans__cardTag}></div>
                      <div className={classes.plans__cardHead}>
                        <div>
                          <h3>{plan.name}</h3>
                          <div className={`${classes.plans__cardHeadDetail}`}>
                            <span>Costo del plan</span>
                            {userOption === "forSomeone" && (
                              <div>${plan.price} antes</div>
                            )}
                            <h4>${getPriceCalculated(plan.price)} al mes</h4>
                          </div>
                        </div>
                        <img
                          src="/src/assets/icons/IcHomeLight.svg"
                          alt="image-card"
                        />
                      </div>
                      <div className={classes.plans__cardPlans}>
                        <ul>
                          {plan.description.map((item, index) => (
                            <li key={index}>
                              <img
                                src="/src/assets/icons/GlMedicalAttentionSolid.svg"
                                alt="icon"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={classes.plans__cardButton}>
                        <Button
                          color="secondary"
                          text="Seleccionar Plan"
                          size="sm"
                          width="max"
                          onClick={() =>
                            planSelected({
                              namePlan: plan.name,
                              pricePlan: getPriceCalculated(plan.price),
                            })
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </QuoteLayout>
  );
}
