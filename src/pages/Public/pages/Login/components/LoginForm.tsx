import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import Button from "@components/Button/Button";
import FormInputField from "@components/Input/FormInputField";
import Form from "@components/StyledComponents/StyledForm";

import {
  MIN_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH_MESSAGE,
  REQUIRED_MESSAGE,
  WRONG_EMAIL_FORMAT_MESSAGE,
} from "@constants/constants";

interface LoginFormProps {
  handleLogin: () => void;
}

const schema = object().shape({
  email: string().email(WRONG_EMAIL_FORMAT_MESSAGE).required(REQUIRED_MESSAGE),
  password: string()
    .required(REQUIRED_MESSAGE)
    .min(MIN_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH_MESSAGE),
});

const LoginForm = (props: LoginFormProps) => {
  const { t } = useTranslation();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form
      noValidate //Prevents default Chrome email validation
      onSubmit={handleSubmit((data) => {
        console.info(data);
        props.handleLogin();
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
        autoCompleteAttribute="current-password"
        control={control}
        name="password"
        placeholder={t("FORM.PASSWORD")}
        type="password"
      />
      <Button text={t("COMMON.BUTTONS.SUBMIT")} type="submit" />
    </Form>
  );
};

export default LoginForm;
