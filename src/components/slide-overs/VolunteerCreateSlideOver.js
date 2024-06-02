import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Icon from "../Icon";
import Button from "../Button";
import InputInline from "../InputInline";
import { Field, Formik } from "formik";
import Status from "../Status";

const VolunteerCreateSlideOver = ({ open, setOpen }) => {
  const fieldStyle = "flex items-center";
  const fieldLabelStyle =
    "text-sm text-body-600 sm:w-40 sm:flex-shrink-0 lg:w-44";
  const fieldInputStyle = "sm:col-span-2 sm:mt-0 grow";

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
    setOpen(false);
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <div className="fixed inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-in-out duration-200 sm:duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-200 sm:duration-500"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="pointer-events-auto w-screen max-w-xl">
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    birthDate: "",
                    status: "",
                    region: "",
                  }}
                  onSubmit={handleSubmit}
                >
                  {({ handleSubmit, setFieldValue }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                    >
                      <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-gradient-to-l from-[#53678A] to-[#394966] p-8">
                          <div className="flex flex-col items-center justify-between">
                            <div className="w-full flex justify-end">
                              <button
                                type="button"
                                className="relative"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <Icon
                                  name="Close"
                                  className="h-8 w-8 text-primary-0"
                                />
                              </button>
                            </div>
                            <div className="w-full flex items-center mt-8">
                              <DialogTitle className="text-2xl font-semibold leading-6 text-white">
                                Новий доброволець
                              </DialogTitle>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col p-8 justify-between">
                          <dl className="flex flex-col gap-y-2">
                            <div className={fieldStyle}>
                              <dt className={fieldLabelStyle}>Імʼя</dt>
                              <dd className={fieldInputStyle}>
                                <InputInline
                                  size="small"
                                  placeholder="Петро"
                                  name="firstName"
                                />
                              </dd>
                            </div>

                            <div className={fieldStyle}>
                              <dt className={fieldLabelStyle}>Прізвище</dt>
                              <dd className={fieldInputStyle}>
                                <InputInline
                                  size="small"
                                  placeholder="Петренко"
                                  name="lastName"
                                />
                              </dd>
                            </div>

                            <div className={fieldStyle}>
                              <dt className={fieldLabelStyle}>
                                Дата народження
                              </dt>
                              <dd className={fieldInputStyle}>
                                <InputInline
                                  size="small"
                                  name="birthDate"
                                  type="date"
                                />
                              </dd>
                            </div>

                            <div className={fieldStyle}>
                              <dt className={fieldLabelStyle}>Статус</dt>
                              <dd className={fieldInputStyle}>
                                <Field name="status">
                                  {({ field }) => (
                                    <Status
                                      value={field.value}
                                      options={[
                                        {
                                          value: "AVAILABLE",
                                          label: "Активний",
                                        },
                                        {
                                          value: "UNAVAILABLE",
                                          label: "Неактивний",
                                        },
                                        {
                                          value: "ATTENDING_EVENT",
                                          label: "На події",
                                        },
                                        {
                                          value: "EN_ROUTE_TO_EVENT",
                                          label: "В дорозі",
                                        },
                                        {
                                          value: "REQUESTED",
                                          label: "Запрошено",
                                        },
                                      ]}
                                      placeholder="Оберіть статус"
                                      onChange={(e) =>
                                        setFieldValue("status", e.target.value)
                                      }
                                    />
                                  )}
                                </Field>
                              </dd>
                            </div>

                            <div className={fieldStyle}>
                              <dt className={fieldLabelStyle}>Локація</dt>
                              <dd className={fieldInputStyle}>
                                <InputInline
                                  size="small"
                                  placeholder="Введіть локацію"
                                  name="region"
                                />
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 justify-end px-8 py-4 gap-4">
                        <Button
                          variant="secondary"
                          onClick={() => setOpen(false)}
                        >
                          Скасувати
                        </Button>
                        <Button type="submit">Створити</Button>
                      </div>
                    </form>
                  )}
                </Formik>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default VolunteerCreateSlideOver;
