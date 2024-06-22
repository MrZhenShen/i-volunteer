import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Логін відсутній"),
    password: Yup.string()
      .min(6, "Пароль повинен містити мінімум 6 символів")
      .required("Пароль є обов'язковим"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    try {
      // TODO: Handle sign in submittion
      console.log("Sign In handled");
      console.log(values);
    } catch (error) {
      console.error("Failed to create event:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignUpClick = () => {
    navigate("/auth/sign-up");
  };

  const errorValue = (touched, error) => {
    return touched && error ? error : "";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Вхід в систему</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <Input
                  label="Логін"
                  name="username"
                  footnote={errorValue(touched.username, errors.username)}
                />
              </div>
              <div className="mb-4">
                <Input
                  label="Пароль"
                  name="password"
                  type="password"
                  footnote={errorValue(touched.password, errors.password)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Button type="submit">Увійти</Button>
                <Button size="small" variant="link" onClick={handleSignUpClick}>
                  Створити профіль
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignInPage;
