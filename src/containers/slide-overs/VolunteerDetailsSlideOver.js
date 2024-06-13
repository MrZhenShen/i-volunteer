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
import { Map } from "../../components/map/Map";

const VolunteerDetailsSlideOver = ({ open, setOpen, volunteer }) => {
  const fieldStyle = "flex";
  const fieldLabelStyle =
    "text-sm text-body-600 py-1.5 px-2 sm:w-40 sm:flex-shrink-0 lg:w-44";
  const fieldInputStyle = "sm:col-span-2 sm:mt-0 grow";
  const fieldValueStyle = "text-body-900 leading-6 py-1.5 px-2";

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
                  <div className="overflow-y-auto">
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
                        <div className="w-full flex flex-col gap-4 mt-8">
                          <DialogTitle className="text-2xl font-semibold leading-6 text-white select-all">
                            {volunteer.firstName} {volunteer.lastName}
                          </DialogTitle>
                          <div className="text-xs font-light text-white select-all">
                            {volunteer.correlationId}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <dl className="flex flex-col gap-y-2">
                        <div className={fieldStyle}>
                          <dt className={fieldLabelStyle}>Імʼя</dt>
                          <dd className={fieldValueStyle}>
                            {volunteer.firstName}
                          </dd>
                        </div>

                        <div className={fieldStyle}>
                          <dt className={fieldLabelStyle}>Прізвище</dt>
                          <dd className={fieldValueStyle}>
                            {volunteer.lastName}
                          </dd>
                        </div>

                        <div className={fieldStyle}>
                          <dt className={fieldLabelStyle}>Статус</dt>
                          <dd className={fieldInputStyle}>
                            {volunteer.status === "AVAILABLE" ? (
                              <Status
                                placeholder="Активний"
                                value="Активний"
                                color="green"
                              />
                            ) : volunteer.status === "UNAVAILABLE" ? (
                              <Status
                                placeholder="Неактивний"
                                value="Неактивний"
                                color="gray"
                              />
                            ) : volunteer.status === "ATTENDING_EVENT" ? (
                              <Status
                                placeholder="Залучений"
                                value="Залучений"
                                color="red"
                              />
                            ) : (
                              <Status
                                placeholder="В дорозі"
                                value="В дорозі"
                                color="green"
                              />
                            )}
                          </dd>
                        </div>

                        <div className={fieldStyle}>
                          <dt className={fieldLabelStyle}>Тел</dt>
                          <dd className={fieldValueStyle}>
                            {volunteer.mobilePhone}
                          </dd>
                        </div>

                        <div className={fieldStyle}>
                          <dt className={fieldLabelStyle}>Дата народження</dt>
                          <dd className={fieldValueStyle}>
                            {volunteer.birthDate}
                          </dd>
                        </div>

                        <div className={fieldStyle}>
                          <dt className={fieldLabelStyle}>Адреса</dt>
                          <dd className={fieldValueStyle}>
                            {volunteer.address.zipCode}
                            {volunteer.address.state &&
                              `, ${volunteer.address.state}`}
                            {volunteer.address.city &&
                              `, ${volunteer.address.city}`}
                            {volunteer.address.street &&
                              `, ${volunteer.address.street}`}
                            {volunteer.address.buildingNumber &&
                              `, ${volunteer.address.buildingNumber}`}
                            {volunteer.address.apartmentNumber &&
                              `, ${volunteer.address.apartmentNumber}`}
                          </dd>
                        </div>

                        <div className="flex flex-col gap-y-2 h-80 py-3">
                          <Map
                            markers={[
                              {
                                id: volunteer.id,
                                type: "rescuer",
                                position: [
                                  volunteer.longitude, volunteer.latitude,
                                ],
                                selected: false,
                              },
                            ]}
                          />
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

export default VolunteerDetailsSlideOver;
