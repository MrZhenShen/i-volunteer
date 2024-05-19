import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Icon from "./Icon";
import { useField } from "formik";

/**
 * Input component with optional icon, label, and footnote.
 * 
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.name - name of field for formik Form
 * @param {string} [props.label] - The label text for the input.
 * @param {string} [props.placeholder] - The placeholder text for the input.
 * @param {string} [props.footnote] - The footnote text displayed below the input.
 * @param {string} [props.icon] - The name of the icon to display inside the input.
 * @param {string} [props.size='default'] - The size of the input ('default' or 'small').
 * @param {boolean} [props.disabled=false] - If true, the input is disabled.
 * 
 * @returns {JSX.Element} The rendered input component.
 * @example
 * // Example usage in a form:
 * import { Formik, Form } from 'formik';
 * import Input from "../components/Input";
 * import Button from "../components/Button";
 * 
 * const MyForm = () => (
 *    <Formik initialValues={{ firstName: "" }}>
 *      <Form>
 *        <Input
 *          label="Username"
 *          placeholder="Enter your username"
 *          footnote="This is a required field."
 *          icon="Search"
 *          size="default"
 * />
 *          <Button type="submit">Submit</Button>
 *      </Form>
 *    </Formik>
 * );
 */
const Input = ({
  label,
  placeholder,
  footnote,
  icon,
  size = "default",
  disabled = false,
  ...props
}) => {
  const [field] = useField(props);

  const baseInputStyles = `
    block w-full rounded-md text-body-900 leading-6
    ${icon ? "pl-10" : ""}
    border-primary-200 placeholer-body-400 
    hover:border-primary-400
    focus:border-blue-500 focus:ring-0
    transition ease-in-out duration-100
    disabled:bg-body-100 disabled:border-0 disabled:cursor-not-allowed
     `;

  const inputSizes = {
    default: "py-2 px-4 text-base",
    small: "py-1 px-3 text-sm",
  };

  const labelSizes = {
    default: "text-base leading-6",
    small: "text-sm leading-5",
  };

  const iconSizes = {
    default: "w-6 h-6",
    small: "w-5 h-5",
  };

  const inputClass = classNames(baseInputStyles, inputSizes[size]);
  const labelClass = classNames(
    "block text-basetext-body-900",
    labelSizes[size]
  );
  const iconClass = classNames("text-body-900", iconSizes[size]);

  return (
    <div className="flex flex-col gap-2">
      {label && <label className={labelClass}>{label}</label>}

      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon name={icon} className={iconClass} />
          </div>
        )}
        <input
          className={inputClass}
          placeholder={placeholder}
          disabled={disabled}
          {...field}
          {...props}
        />
      </div>

      {footnote && (
        <label className="text-sm leading-5 text-body-700">{footnote}</label>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  footnote: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.oneOf(["default", "small"]),
  disabled: PropTypes.bool,
};

export default Input;
