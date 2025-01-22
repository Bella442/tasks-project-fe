import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import { useGetCountriesQuery } from "@api/shared/api";

import Button from "@components/Button/Button";
import FormInputField from "@components/Input/FormInputField";
import FormRadioGroup from "@components/RadioButton/FormRadioGroup";
import Select from "@components/Select/Select";
import Form from "@components/StyledComponents/StyledForm";

import {
  MIN_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH_MESSAGE,
  REQUIRED_MESSAGE,
  WRONG_EMAIL_FORMAT_MESSAGE,
} from "@constants/constants";
import { ROUTES } from "@routes/routes";
import { Country } from "@sharedTypes/globalTypes";

const schema = object().shape({
  email: string().email(WRONG_EMAIL_FORMAT_MESSAGE).required(REQUIRED_MESSAGE),
  password: string()
    .required(REQUIRED_MESSAGE)
    .min(MIN_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH_MESSAGE),
  country: object().required(REQUIRED_MESSAGE).typeError(REQUIRED_MESSAGE),
  city: string().required(REQUIRED_MESSAGE),
  profileType: string().required(REQUIRED_MESSAGE),
});

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { data } = useGetCountriesQuery();
  const { t } = useTranslation();

  const radioOptions = [
    {
      label: t("FORM_OPTION.BUSINESS"),
      value: "1",
    },
    {
      label: t("FORM_OPTION.PERSONAL"),
      value: "2",
    },
  ];

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      country: "",
      city: "",
      profileType: "",
    },
  });

  return (
    <Form
      noValidate // Prevents default Chrome email validation
      onSubmit={handleSubmit((data) => {
        console.info(data);
        navigate(ROUTES.LOGIN, { state: { redirectFromRegistration: true } });
      })}
    >
      <FormInputField
        autoCompleteAttribute="email"
        control={control}
        name="email"
        placeholder={t("FORM.EMAIL")}
        type="email"
      />
      <FormInputField
        autoCompleteAttribute="new-password"
        control={control}
        name="password"
        placeholder={t("FORM.PASSWORD")}
        type="password"
      />
      <Controller
        control={control}
        name="country"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Select<Country>
            error={error}
            options={data}
            placeholder={t("COMMON.LABELS.COUNTRY")}
            value={value as Country}
            onChange={(_event, value) => onChange(value)}
          />
        )}
      />
      <FormInputField
        control={control}
        name="city"
        placeholder={t("FORM.CITY")}
        type="text"
      />
      <FormRadioGroup
        control={control}
        label={t("FORM.PROFILE_TYPE")}
        name="profileType"
        options={radioOptions}
      />
      <Button text={t("COMMON.BUTTONS.SIGN_UP")} type="submit" />
    </Form>
  );
};

export default RegistrationForm;
