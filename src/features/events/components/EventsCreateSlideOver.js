import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { EventType, EventTypeDetails } from "../../../api/events.facade";
import Button from "../../../components/Button";
import { FormDatePicker, FormNumbericInput, FormStatus, FormTable, FormText } from "../../../components/form-table";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { Map } from "../../../components/map/Map";
import SlideOver from "../../../components/SlideOver";
import { createEvent } from "../thunks";

function Header() {
  return (
    <div className="flex flex-col bg-gradient-to-l from-[#BF4040] to-[#660000] p-14 pb-16">
      <span className="text-2xl text-white font-bold">Нова подія</span>
    </div>
  )
}

function EventForm({ onSubmit, geo }) {
  const dispatch = useDispatch();
  const [latitude, longitude] = geo ?? [0, 0];

  const initialValues = {
    eventType: "",
    dateTime: "",
    requiredVolunteers: "",
    description: "",
    zipCode: "",
    state: "",
    city: "",
    street: "",
    apartmentNumber: "",
    latitude: latitude || 0,
    longitude: longitude || 0,
  };

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

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(createEvent(values)).unwrap();
      onSubmit();
    } catch (error) {
      console.error("Failed to create event:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const eventTypeOptions = Object.values(EventType).reduce((options, eventType) => {
    const details = EventTypeDetails[eventType];
    if (!details) return options;

    return [...options, {
      value: eventType,
      label: EventTypeDetails[eventType].text,
    }];
  }, []);

  const isCoordsDefined = (values) => values.latitude !== 0 && values.longitude !== 0;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      initialErrors={{ eventType: "" }}
      onSubmit={handleSubmit}
    >
      {({
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <form onSubmit={handleSubmit} className="pt-8">
          <FormTable>
            <FormStatus
              label="Тип події"
              name="eventType"
              options={eventTypeOptions}
              placeholder="Оберіть тип події"
              setFieldValue={setFieldValue}
            />
            <FormDatePicker label="Час виникнення" name="dateTime" />
            <FormNumbericInput label="Кількість добровольців" name="requiredVolunteers" min={1} />
            <FormText label="Опис" name="description" placeholder="Опишіть коротко ситуацію" />
            <FormText label="Область" name="state" placeholder="Львівська" />
            <FormText label="Місто" name="city" placeholder="Львів" />
            <FormText label="Поштовий індекс" name="zipCode" placeholder="79000" />
            <FormText label="Вулиця" name="street" placeholder="Щаслива, 7" />
            <FormText label="Квартира" name="apartmentNumber" placeholder="10" />
          </FormTable>

          {!isCoordsDefined(values) && (
            <div className="px-32 py-6 bg-body-50 border border-body-50 rounded-md">
              Оберіть адресу для виведення списку доступних добровольців
            </div>
          )}

          {isCoordsDefined(values) && (
            <div className="h-80">
              <Map markers={[{
                id: 'event/new',
                type: 'event',
                position: [values.latitude, values.longitude],
              }]} />
            </div>
          )}

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
              <Button variant="secondary" onClick={() => false}>
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
  )
}

function EventCreateSlideOver({ isOpen, toggle, position }) {
  const eventsLoading = useSelector((state) => state.events.loading);
  return (
    <SlideOver isOpen={isOpen} toggle={toggle}>
      <div className="flex h-full flex-col bg-white shadow-xl overflow-y-auto">
        <Header />
        <div className="px-14">
          <EventForm onSubmit={() => toggle()} geo={position} />
          {eventsLoading && <LoadingOverlay />}
        </div>
      </div>
    </SlideOver>
  )
}

export default EventCreateSlideOver;
