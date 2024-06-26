import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import classNames from "classnames";

/**
 * A custom Select component that integrates with Formik for form handling.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.label - The label for the select element.
 * @param {string} props.placeholder - The placeholder for the select element.
 * @param {string} props.footnote - The footnote text for the select element.
 * @param {string} [props.size='default'] - The size of the select element, can be 'default' or 'small'.
 * @param {boolean} props.disabled - Whether the select element is disabled.
 * @param {Array} props.options - An array of options for the select element.
 * @param {Object} props.field - The Formik field props.
 *
 * @returns {JSX.Element} The rendered Select component.
 *
 * @example
 * const options = [
 *  { value: 'option1', label: 'Option 1' },
 *  { value: 'option2', label: 'Option 2' }
 * ];
 * return (
 *  <Select
 *    label="Select an option"
 *    placeholder="Please select"
 *    footnote="Choose wisely"
 *    size="default"
 *    options={options}
 *  />
 * );
 */
const Select = ({
  label,
  placeholder,
  footnote,
  size = "default",
  disabled,
  options = [],
  ...props
}) => {
  const [field] = useField(props);

  const baseSelectStyles = `
    block w-full rounded-md text-body-900 leading-6 pr-10
    border-primary-200 placeholder-body-400
    hover:border-primary-400
    focus:border-blue-500 focus:ring-0
    transition ease-in-out duration-100
    disabled:bg-body-100 disabled:border-0 disabled:text-body-400 disabled:cursor-not-allowed 
  `;

  const selectSizes = {
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

  const selectClass = classNames(baseSelectStyles, selectSizes[size]);
  const labelClass = classNames("block text-body-900", labelSizes[size]);
  const iconClass = classNames("text-body-900", iconSizes[size]);

  return (
    <div className="flex flex-col gap-2">
      {label && <label className={labelClass}>{label}</label>}

      <div className="relative">
        <select
          className={selectClass}
          disabled={disabled}
          {...field}
          {...props}
        >
          {placeholder && (
            <option value="" disabled selected>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {footnote && (
        <label className="text-sm leading-5 text-body-700">{footnote}</label>
      )}
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  footnote: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.oneOf(["default", "small"]),
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default Select;
