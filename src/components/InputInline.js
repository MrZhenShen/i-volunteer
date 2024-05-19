import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useField } from "formik";

/**
 * InputInline component renders an input field with various styles and configurations.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.placeholder - Placeholder text for the input.
 * @param {string} props.name - name of field for formik Form
 * @param {'default' | 'small'} props.size - Size of the input, can be 'default' or 'small'.
 * @param {boolean} props.disabled - Whether the input is disabled.
 * @returns {JSX.Element} Rendered input component.
 *
 * @example
 * // Example usage in a form:
 * import { Formik, Form } from 'formik';
 * import InputInline from "../components/InputInline";
 * import Button from "../components/Button";
 * 
 * const MyForm = () => (
 *    <Formik initialValues={{ firstName: "" }}>
 *      <Form>
 *        <InputInline placeholder="test" name="firstName" />
 *          <Button type="submit">Submit</Button>
 *      </Form>
 *    </Formik>
 * );
 */
const InputInline = ({
  placeholder = "",
  size = "default",
  disabled = false,
  ...props
}) => {
  const [field] = useField(props);

  const baseInputStyles = `
    block w-full rounded-md text-body-900 leading-6
    border-transparent
    placeholer-body-400 
    hover:border-primary-200 hover:border-[1px]
    focus:border-blue-500 focus:ring-0
    transition ease-in-out duration-100
    disabled:text-body-400 disabled:border-0 disabled:cursor-not-allowed
     `;

  const inputSizes = {
    default: "py-2 px-4 text-base",
    small: "py-1 px-3 text-sm",
  };

  const inputClass = classNames(baseInputStyles, inputSizes[size]);

  return (
    <div>
      <input
        className={inputClass}
        placeholder={placeholder}
        disabled={disabled}
        {...field}
        {...props}
      />
    </div>
  );
};

InputInline.propTypes = {
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(["default", "small"]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default InputInline;
