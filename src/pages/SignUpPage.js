import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import Input from "../components/Input";
import Button from "../components/Button";
import { register } from '../features/auth/thunks';
import LoadingOverlay from "../components/LoadingOverlay";


const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    rnokpp: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Логін є обов'язковим"),
    email: Yup.string()
      .email("Некоректний емайл")
      .required("Емайл є обов'язковим"),
    rnokpp: Yup.string()
      .matches(/^\d{10}$/, "РНОКПП повинен містити рівно 10 цифр")
      .required("РНОКПП є обов'язковим"),
    password: Yup.string()
      .min(6, "Пароль повинен містити мінімум 6 символів")
      .required("Пароль є обов'язковим"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(register(values)).unwrap();
      navigate("/auth/sign-in");
    } catch (error) {
      console.error("Failed to create event:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignInClick = () => {
    navigate("/auth/sign-in");
  };

  const errorValue = (touched, error) => {
    return touched && error ? error : "";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Реєстрація</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Input
                  label="Логін"
                  name="username"
                  footnote={errorValue(touched.username, errors.username)}
                />
              </div>
              <div className="mb-4">
                <Input
                  label="Емайл"
                  name="email"
                  type="email"
                  footnote={errorValue(touched.email, errors.email)}
                />
              </div>
              <div className="mb-4">
                <Input
                  label="РНОКПП"
                  name="rnokpp"
                  footnote={errorValue(touched.rnokpp, errors.rnokpp)}
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
                <Button type="submit" disabled={isSubmitting}>Зареєструватись</Button>
                <Button size="small" variant="link" onClick={handleSignInClick}>
                  Увійти в систему
                </Button>
              </div>

              {isSubmitting && <LoadingOverlay />}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;
