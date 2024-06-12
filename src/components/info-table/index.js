import Status from "../Status"
import { formatAddress } from "../../utils/formatAddress"

export function InfoLabel({ label }) {
  if (!label) {
    return null;
  }

  return (
    <dt className="text-sm font-normal leading-5 text-body-600 py-1.5 px-2 sm:w-40 sm:flex-shrink-0 lg:w-44">
      {label}
    </dt>
  )
}

export function InfoValue({ value }) {
  if (!value) {
    return null;
  }

  return (
    <dd className="text-sm font-normal leading-5 text-body-900 py-1.5 px-2">
      {value}
    </dd>
  )
}

export function InfoText({ label, text }) {
  if (!text) {
    return null;
  }

  return (
    <div className="flex">
      <InfoLabel label={label} />
      <InfoValue value={text} />
    </div>
  )
}

export function InfoStatus({ statusText, statusColor }) {
  if (!statusText) {
    return null;
  }

  return (
    <div className="flex">
      <InfoLabel label="Статус" />
      <dd className="sm:col-span-2 sm:mt-0 grow self-center">
        <Status placeholder={statusText} value={statusText} color={statusColor} />
      </dd>
    </div>
  )
}

export function InfoAddress({ address }) {
  const addressLine = formatAddress(address);

  if (addressLine === "") {
    return null;
  }

  return (
    <div className="flex">
      <InfoLabel label="Адреса" />
      <InfoValue value={addressLine} />
    </div>
  )
}

export function InfoTable({ children }) {
  return (
    <dl className="flex flex-col gap-y-2 mb-6">
      {children}
    </dl>
  )
}
