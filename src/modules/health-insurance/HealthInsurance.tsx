/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect } from "react";
import MainLayout from "../core/layouts/MainLayout";
import UserContext from "../core/states/user/user-context";
import { useForm } from "react-hook-form";
import { IUser } from "../core/interfaces/user";
import classes from "./health-insurance.module.scss";
import SelectorInput from "../core/components/atoms/selector-input/SelectorInput";
import Input from "../core/components/atoms/input/Input";
import Button from "../core/components/atoms/button/Button";
import Checkbox from "../core/components/atoms/checkbox/Checkbox";
import { useNavigate } from "react-router-dom";

type FormData = {
  docType: string;
  docNumber: string;
  phoneNumber: string;
  acceptPrivacyPolicy: boolean;
  acceptCommercialPolicy: boolean;
};

export default function HealthInsurance() {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      docType: "DNI",
      docNumber: "",
      phoneNumber: "",
      acceptPrivacyPolicy: false,
      acceptCommercialPolicy: false,
    },
    mode: "onChange",
  });

  const selectorOptions = [
    { name: "DNI", value: "DNI" },
    { name: "RUC", value: "RUC" },
  ];

  const docType = watch("docType");

  const onSubmit = (formData: FormData) => {
    if (!isValid) {
      return;
    }
    getUserInfo(formData);
  };

  const getUserInfo = async (formData: FormData) => {
    try {
      const response = await fetch(
        "https://rimac-front-end-challenge.netlify.app/api/user.json"
      );
      const data = await response.json();
      if (!data) return;
      const userData: IUser = {
        name: data?.name,
        lastName: data?.lastName,
        birthDay: data?.birthDay,
        docType: formData.docType,
        docNumber: formData.docNumber,
        phoneNumber: formData.phoneNumber,
        plan: null,
      };
      setUserData(userData);
      navigate("/plans");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    setValue("docNumber", "");
  }, [docType, setValue]);

  useEffect(() => {
    // limpieza inicial de user
    setUserData(null);
  }, []);

  return (
    <MainLayout>
      <div className={classes.health}>
        <div className={classes.health__container}>
          <div className={classes.health__image}>
            <img src="/rimac-challenge/imgs/persons.png" alt="persons.png" />
          </div>

          <div className={classes.health__head}>
            <span className={classes.health__headTag}>
              Seguro Salud Flexible
            </span>
            <h3>Creado para ti y tu familia</h3>
          </div>

          <div className={classes.health__main}>
            <p>
              Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
              asesoría. 100% online.
            </p>

            <form
              className={classes.health__form}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={classes.health__formInputs}>
                {/* Documento */}
                <div>
                  <SelectorInput
                    inputType="number"
                    label="Nro. de documento"
                    selectorValue={watch("docType")}
                    selectorOptions={selectorOptions}
                    inputValue={watch("docNumber")}
                    onSelectorChange={(value) => setValue("docType", value)}
                    onInputChange={(value) =>
                      setValue("docNumber", value, { shouldValidate: true })
                    }
                    validators={register("docNumber", {
                      required: "Este campo es requerido",
                      validate: {
                        length: (value) =>
                          docType === "DNI"
                            ? value.length === 8 ||
                              "El número de documento es inválido"
                            : value.length === 11 ||
                              "El número de documento es inválido",
                      },
                    })}
                    error={errors.docNumber}
                  />
                  {errors.docNumber && (
                    <p className={classes.error}>{errors.docNumber.message}</p>
                  )}
                </div>

                {/* Celular*/}
                <div>
                  <Input
                    inputType="number"
                    label="Celular"
                    inputValue={watch("phoneNumber")}
                    onInputChange={(value: any) =>
                      setValue("phoneNumber", value, { shouldValidate: true })
                    }
                    validators={register("phoneNumber", {
                      required: "Este campo es requerido",
                      validate: (value) =>
                        value.length === 9 && value.startsWith("9")
                          ? true
                          : "El número de celular es inválido",
                    })}
                    error={errors.phoneNumber}
                  />
                  {errors.phoneNumber && (
                    <p className={classes.error}>
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>

              <div className={classes.health__formCheckboxes}>
                <div>
                  <Checkbox
                    id="acceptPrivacyPolicy"
                    checked={watch("acceptPrivacyPolicy")}
                    onChange={(checked) =>
                      setValue("acceptPrivacyPolicy", checked)
                    }
                    validators={register("acceptPrivacyPolicy", {
                      required: true,
                    })}
                    error={errors.acceptPrivacyPolicy}
                  />
                  <label htmlFor="acceptPrivacyPolicy">
                    Acepto lo Política de Privacidad
                  </label>
                </div>
                <div>
                  <Checkbox
                    id="acceptCommercialPolicy"
                    checked={watch("acceptCommercialPolicy")}
                    onChange={(checked) =>
                      setValue("acceptCommercialPolicy", checked)
                    }
                    validators={register("acceptCommercialPolicy", {
                      required: true,
                    })}
                    error={errors.acceptCommercialPolicy}
                  />
                  <label htmlFor="acceptCommercialPolicy">
                    Acepto la Política Comunicaciones Comerciales
                  </label>
                </div>
                <p>Aplican Términos y Condiciones.</p>
              </div>

              <div className={classes.health__formButton}>
                <Button
                  text="Cotiza aquí"
                  type="submit"
                  size="md"
                  color="primary"
                  width="max"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
