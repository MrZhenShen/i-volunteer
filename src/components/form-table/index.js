import { Field } from 'formik';
import InputInline from '../InputInline';
import Status from '../Status';

export function FormTable({ children }) {
  return (
    <dl className="flex flex-col gap-y-2 mb-6">
      {children}
    </dl>
  )
}

export function FormLabel({ label }) {
  if (!label) {
    return null;
  }

  return (
    <dt className="w-1/3 flex items-center text-sm font-normal leading-5 text-body-600">
      {label}
    </dt>
  )
}

export function FormTextInput({ name, placeholder, type, min }) {
  return (
    <dd className="grow text-sm font-normal leading-9 text-body-900 m-0">
      <InputInline
        size="small"
        type={type}
        name={name}
        placeholder={placeholder}
        min={min}
      />
    </dd>
  )
}

export function FormText({ label, name, placeholder }) {
  return (
    <div className="flex">
      <FormLabel label={label} />
      <FormTextInput name={name} placeholder={placeholder} />
    </div>
  )
}

export function FormStatus({ label, placeholder, name, options, setFieldValue }) {
  return (
    <div className="flex">
      <FormLabel label={label} />
      <dd className="grow self-center m-0">
        <Field name="eventType">
          {({ field }) => (
            <Status
              placeholder={placeholder}
              value={field.value}
              color="gray"
              options={options}
              onChange={(e) =>
                setFieldValue(
                  name,
                  e.target.value
                )
              }
            />
          )}
        </Field>
      </dd>
    </div>
  )
}

export function FormDatePicker({ label, name }) {
  return (
    <div className="flex">
      <FormLabel label={label} />
      <FormTextInput type="dateTime-local" name={name} placeholder="-" />
    </div>
  )

}

export function FormNumbericInput({ label, name, min }) {
  return (
    <div className="flex">
      <FormLabel label={label} />
      <FormTextInput type="number" name={name} placeholder="0" min={min} />
    </div>
  )
}
