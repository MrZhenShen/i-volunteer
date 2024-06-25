import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../features/auth/thunks';
import LoadingOverlay from "../components/LoadingOverlay";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(state => state.auth);

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

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(login(values)).unwrap();
      navigate("/map")
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
          {({ errors, touched, isSubmitting }) => (
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

              {auth.error && (
                <div className="mb-4">
                  <span className="text-red-500 text-sm">Невірний логін або пароль</span>
                </div>
              )}
            
              <div className="flex items-center justify-between">
                <Button type="submit">Увійти</Button>
                <Button size="small" variant="link" onClick={handleSignUpClick}>
                  Створити профіль
                </Button>
              </div>

              {isSubmitting && <LoadingOverlay />}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignInPage;
