import * as hlr from '@headlessui/react';

import Icon from './Icon';

export function Menu({ selected, items, onSelect }) {
  const lable = selected
    ? items.find((item) => item.value === selected)?.label || '...'
    : '...';
  return (
    <hlr.Menu>
      <hlr.MenuButton className="ml-2 py-2 px-4 rounded-xl border-primary-200 border">
        <span>{lable}</span>
        <Icon name="Select" className="inline-block ml-2 w-6 h-6" />
      </hlr.MenuButton>
      <hlr.Transition
        enter="transition duration-[200ms]"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition duration-200 ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <hlr.MenuItems anchor="bottom start" className="grid shadow-[0px_4px_12px_0px_rgba(13,26,38,0.25)] p-4 rounded-md grid-cols-1 gap-y-6 z-[401] bg-white">
          {items.map((item) => (
            <hlr.MenuItem key={item.value} className="border-b-4 border-transparent data-[focus]:border-inherit pb-1">
              <button onClick={() => onSelect(item.value)} className="flex flex-row items-center gap-2">
                {item.icon && <span className="p-0.5 bg-primary-50 rounded-md"><Icon name={item.icon} className="w-6 h-6" /></span>}
                <span>{item.label}</span>
              </button>
            </hlr.MenuItem>
          ))}
        </hlr.MenuItems>
      </hlr.Transition>
    </hlr.Menu>
  )
}

