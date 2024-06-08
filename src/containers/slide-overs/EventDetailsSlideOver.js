import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Icon from "../../components/Icon";
import Status from "../../components/Status";
import { EventTypeDetails } from "../../api/events.facade";
import { Map } from "../../components/map/Map";

const EventCreateSlideOver = ({ open, setOpen, event }) => {
  const fieldStyle = "flex items-center";
  const fieldLabelStyle =
    "text-sm text-body-600 sm:w-40 sm:flex-shrink-0 lg:w-44";
  const fieldValueStyle = "text-body-900 leading-6 py-1.5 px-2";

  const eventType = {
    value: event.eventType,
    label: EventTypeDetails[event.eventType].text,
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
                <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
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
                        <div className="w-full flex flex-col gap-4 mt-8">
                          <DialogTitle className="text-2xl font-semibold leading-6 text-white select-none">
                            {eventType.label}
                          </DialogTitle>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-8 justify-between">
                      <dl className="flex flex-col gap-y-2">
                        {/* Тип події - eventType */}
                        <div className={fieldStyle}>
                          <dt className={fieldLabelStyle}>Тип події</dt>
                          <dd className={fieldValueStyle}>
                            <Status
                              placeholder={eventType.label}
                              value={eventType.label}
                            />
                          </dd>
                        </div>

                        {/* Необхідна к-сть добровольців - requiredVolunteers */}
                        {event.requiredVolunteers && (
                          <div className={fieldStyle}>
                            <dt className={fieldLabelStyle}>
                              К-сть добровольців
                            </dt>
                            <dd className={fieldValueStyle}>
                              {event.requiredVolunteers}
                            </dd>
                          </div>
                        )}

                        {/* Опис - description */}
                        <div className={fieldStyle}>
                          <dt className={fieldLabelStyle}>Опис</dt>
                          <dd className={fieldValueStyle}>
                            {event.description}
                          </dd>
                        </div>

                        {/* Область - state */}
                        <div className={fieldStyle}>
                          <dt className={fieldLabelStyle}>Область</dt>
                          <dd className={fieldValueStyle}>
                            {event.address.state}
                          </dd>
                        </div>

                        {/* Місто city */}
                        <div className={fieldStyle}>
                          <dt className={fieldLabelStyle}>Місто</dt>
                          <dd className={fieldValueStyle}>
                            {event.address.city}
                          </dd>
                        </div>

                        {/* Поштовий індекс - zipCode */}
                        <div className={fieldStyle}>
                          <dt className={fieldLabelStyle}>Поштовий індекс</dt>
                          <dd className={fieldValueStyle}>{event.zipCode}</dd>
                        </div>

                        {/* Вулиця - street */}
                        <div className={fieldStyle}>
                          <dt className={fieldLabelStyle}>Вулиця</dt>
                          <dd className={fieldValueStyle}>
                            {event.address.street}
                          </dd>
                        </div>

                        {/* № квартири apartmentNumber */}
                        <div className={fieldStyle}>
                          <dt className={fieldLabelStyle}>Квартира</dt>
                          <dd className={fieldValueStyle}>
                            {event.address.apartmentNumber}
                          </dd>
                        </div>

                        <div className="flex flex-col gap-y-2 h-80 py-3">
                          <Map
                            markers={[
                              {
                                id: event.id,
                                type: "event",
                                position: [
                                  event.address.latitude,
                                  event.address.longitude,
                                ],
                                selected: false,
                              },
                            ]}
                            center={[
                              event.address.latitude,
                              event.address.longitude,
                            ]}
                          />
                        </div>

                        <div className="flex flex-col gap-6">
                          <dt className="text-sm text-body-600">
                            {event.volunteers.length === 0
                              ? "Добровольців не залучено"
                              : `Залучені добровольці (${event.volunteers.length})`}
                          </dt>
                          <div className="flex flex-col gap-4">
                            {event.volunteers.map((volunteer) => (
                              <div className="flex flex-col gap-2 w-full border-primary-100 border-b pb-4">
                                <dd className="text-md text-body-900 select-all">
                                  {volunteer.firstName} {volunteer.lastName}
                                </dd>
                                <dd className="text-md text-body-900 select-all font-light tracking-wide">
                                  {volunteer.mobilePhone}
                                </dd>
                              </div>
                            ))}
                          </div>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EventCreateSlideOver;
