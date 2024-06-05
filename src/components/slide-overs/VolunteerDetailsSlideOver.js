import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Icon from "../Icon";
import Status from "../Status";

const VolunteerDetailsSlideOver = ({ open, setOpen, volunteer }) => {
  const fieldStyle = "flex items-center";
  const fieldLabelStyle =
    "text-sm text-body-600 sm:w-40 sm:flex-shrink-0 lg:w-44";
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
                <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
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
                            {volunteer.firstName} {volunteer.lastName}
                          </DialogTitle>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-8 justify-between">
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
                          <dt className={fieldLabelStyle}>Поштовий індекс</dt>
                          <dd className={fieldValueStyle}>
                            {volunteer.region}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default VolunteerDetailsSlideOver;
