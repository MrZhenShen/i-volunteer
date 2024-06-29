import { Fragment, useEffect, useRef } from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Icon from "../../components/Icon";
import Button from "../../components/Button";
import InputInline from "../../components/InputInline";
import Status from "../../components/Status";
import { EventTypeDetails } from "../../api/events.facade";
import { Map } from "../../components/map/Map";
import { createEvent } from "../../features/events/thunks";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  eventType: Yup.string().required("Тип події обов'язковий"),
  dateTime: Yup.date().required("Час виникнення обов'язковий"),
  requiredVolunteers: Yup.number()
    .required("К-сть добровольців обов'язкова")
    .min(1, "Мінімальна к-сть добровольців 1"),
  description: Yup.string().required("Опис обов'язковий"),
  zipCode: Yup.string()
    .required("Поштовий індекс обов'язковий")
    .matches(/^\d{5}$/, "Поштовий індекс має складатися з 5 цифр"),
  state: Yup.string().required("Область обов'язкова"),
  city: Yup.string().required("Місто обов'язкове"),
  street: Yup.string().required("Вулиця обов'язкова"),
  apartmentNumber: Yup.string().nullable(),
  latitude: Yup.number().required("Виберіть розташування на карті"),
  longitude: Yup.number().required("Виберіть розташування на карті"),
});

const EventCreateSlideOver = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const mapState = useSelector((state) => state.map);
  const formikRef = useRef(null);

  useEffect(() => {
    if (mapState.lat !== null && mapState.lng !== null) {
      if (formikRef.current) {
        formikRef.current.setFieldValue('latitude', mapState.lat);
        formikRef.current.setFieldValue('longitude', mapState.lng);
      }
    }
  }, [mapState]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(createEvent(values)).unwrap();
      setOpen(false);
    } catch (error) {
      console.error("Failed to create event:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const fieldStyle = "flex items-center";
  const fieldLabelStyle =
    "text-sm text-body-600 sm:w-40 sm:flex-shrink-0 lg:w-44";
  const fieldInputStyle = "sm:col-span-2 sm:mt-0 grow";

  const statusOptions = Object.keys(EventTypeDetails).map((key) => ({
    value: key,
    label: EventTypeDetails[key].text,
  }));

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
                    eventType: "",
                    dateTime: "",
                    requiredVolunteers: "",
                    description: "",
                    zipCode: "",
                    state: "",
                    city: "",
                    street: "",
                    apartmentNumber: "",
                    latitude: 0.0,
                    longitude: 0.0,
                  }}
                  validationSchema={validationSchema}
                  initialErrors={{ eventType: "" }}
                  onSubmit={handleSubmit}
                  innerRef={formikRef}
                >
                  {({
                    handleSubmit,
                    setFieldValue,
                    values,
                    errors,
                    touched,
                    isValid,
                  }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                    >
                      <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-gradient-to-l from-[#BF4040] to-[#660000] p-8">
                          <div className="flex flex-col items-center justify-between">
                            <div className="w-full flex justify-end">
                              <button
                                type="button"
                                className="relative"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only">Закрити панель</span>
                                <Icon
                                  name="Close"
                                  className="h-8 w-8 text-primary-0"
                                />
                              </button>
                            </div>
                            <div className="w-full flex items-center mt-8">
                              <DialogTitle className="text-2xl font-semibold leading-6 text-white">
                                Нова подія
                              </DialogTitle>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col p-8 justify-between">
                          <dl className="flex flex-col gap-y-2">
                            {/* Тип події - eventType */}
                            <div className={fieldStyle}>
                              <dt className={fieldLabelStyle}>Тип події</dt>
                              <dd className={fieldInputStyle}>
                                <Field name="eventType">
                                  {({ field }) => (
                                    <Status
                                      value={field.value}
                                      options={statusOptions}
                                      placeholder="Оберіть тип"
                                      onChange={(e) =>
                                        setFieldValue(
                                          "eventType",
                                          e.target.value
                                        )
                                      }
                                    />
                                  )}
                                </Field>
                              </dd>
                            </div>

                            {/* Час виникнення - dateTime */}
                            <div className={fieldStyle}>
                              <dt className={fieldLabelStyle}>
                                Час виникнення
                              </dt>
                              <dd className={fieldInputStyle}>
                                <InputInline
                                  size="small"
                                  name="dateTime"
                                  type="datetime-local"
                                />
                              </dd>
                            </div>

                            {/* Необхідна к-сть добровольців - requiredVolunteers */}
                            <div className={fieldStyle}>
                              <dt className={fieldLabelStyle}>
                                К-сть добровольців
                              </dt>
                              <dd className={fieldInputStyle}>
                                <InputInline
                                  size="small"
                                  name="requiredVolunteers"
                                  type="number"
                                  placeholder="10"
                                  min="1"
                                />
                              </dd>
                            </div>

                            {/* Опис - description */}
                            <div className={fieldStyle}>
                              <dt className={fieldLabelStyle}>Опис</dt>
                              <dd className={fieldInputStyle}>
                                <InputInline
                                  size="small"
                                  name="description"
                                  placeholder="Опишіть коротко ситуацію"
                                />
                              </dd>
                            </div>

                            {/* Область - state */}
                            <div className={fieldStyle}>
                              <dt className={fieldLabelStyle}>Область</dt>
                              <dd className={fieldInputStyle}>
                                <InputInline
                                  size="small"
                                  name="state"
                                  placeholder="Львівська"
                                />
                              </dd>
                            </div>

                            {/* Місто city */}
                            <div className={fieldStyle}>
                              <dt className={fieldLabelStyle}>Місто</dt>
                              <dd className={fieldInputStyle}>
                                <InputInline
                                  size="small"
                                  name="city"
                                  placeholder="Львів"
                                />
                              </dd>
                            </div>

                            {/* Поштовий індекс - zipCode */}
                            <div className={fieldStyle}>
                              <dt className={fieldLabelStyle}>
                                Поштовий індекс
                              </dt>
                              <dd className={fieldInputStyle}>
                                <InputInline
                                  size="small"
                                  name="zipCode"
                                  placeholder="79000"
                                />
                              </dd>
                            </div>

                            {/* Вулиця - street */}
                            <div className={fieldStyle}>
                              <dt className={fieldLabelStyle}>Вулиця</dt>
                              <dd className={fieldInputStyle}>
                                <InputInline
                                  size="small"
                                  name="street"
                                  placeholder="Щаслива 7"
                                />
                              </dd>
                            </div>

                            {/* № квартири apartmentNumber */}
                            <div className={fieldStyle}>
                              <dt className={fieldLabelStyle}>Квартира</dt>
                              <dd className={fieldInputStyle}>
                                <InputInline
                                  size="small"
                                  name="apartmentNumber"
                                  placeholder="3"
                                />
                              </dd>
                            </div>

                            {/* Map */}
                            {/* Широта - latitude */}
                            {/* Довгота - longitude */}
                            <div className="flex flex-col gap-y-2 h-80 py-3">
                              <Map
                                markers={
                                  [
                                    {
                                      id: 1,
                                      type: "event",
                                      position: [
                                        values.latitude,
                                        values.longitude,
                                      ],
                                      selected: false,
                                    },
                                  ]
                                }
                              />
                            </div>
                          </dl>
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 justify-between items-center px-8 py-4 gap-4">
                        <div className="flex just">
                          {Object.keys(errors).length > 0 && (
                            <div className="text-red-500 text-sm">
                              {Object.keys(errors).find(
                                (key) => touched[key]
                              ) &&
                                errors[
                                  Object.keys(errors).find(
                                    (key) => touched[key]
                                  )
                                ]}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-shrink-0 gap-4">
                          <Button
                            variant="secondary"
                            onClick={() => setOpen(false)}
                          >
                            Скасувати
                          </Button>
                          <Button type="submit" disabled={!isValid}>
                            Створити
                          </Button>
                        </div>
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

export default EventCreateSlideOver;
