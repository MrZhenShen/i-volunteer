import { Fragment } from 'react';
import * as hdr from '@headlessui/react'
import { Transition, TransitionChild } from '@headlessui/react';

import Icon from './Icon';

function SlideOver({ isOpen, toggle, children, showControls = true }) {
  return (
    <>
      <Transition show={isOpen} as={Fragment}>
        <hdr.Dialog onClose={() => toggle()} className="relative z-[1100]">
          <TransitionChild
            as={Fragment}
            enter="transform transition ease-in-out duration-200 sm:duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-200 sm:duration-500"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="fixed inset-y-0 right-0 mt-[88px]">
              <hdr.DialogPanel className="w-[657px] h-[calc(100vh-88px)] border bg-white">
                {showControls && (
                  <div className="top-0 right-0 absolute p-7">
                    <button
                      type="button"
                      className="relative"
                      onClick={() => toggle()}
                    >
                      <span className="sr-only">Close panel</span>
                      <Icon
                        name="Close"
                        className="h-6 w-6 text-primary-0"
                      />
                    </button>
                  </div>
                )}

                {children}
              </hdr.DialogPanel>
            </div>
          </TransitionChild>
        </hdr.Dialog>
      </Transition>
    </>
  )
}

export default SlideOver;
