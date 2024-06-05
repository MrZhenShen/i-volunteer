import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";
import classNames from "classnames";

/**
 * A component that displays a status indicator with an optional icon, color, and selectable options.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} props.value - The selected value
 * @param {Array} [props.options=[]] - The list of selectable options
 * @param {string} [props.icon] - The icon to display
 * @param {string} [props.color="gray"] - The color of the status indicator
 * @param {string} [props.placeholder] - The placeholder text when no value is selected
 * @param {function} props.onChange - The callback function to handle changes
 * @returns {JSX.Element} The rendered component
 * @example
 * // Usage with Formik
 * <Formik
 *   initialValues={{ status: "" }}
 *   onSubmit={(values) => {
 *     console.log(values);
 *   }}
 * >
 *   {({ setFieldValue }) => (
 *     <Form>
 *       <Field name="status">
 *         {({ field }) => (
 *           <Status
 *             value={field.value}
 *             options={[
 *               { value: "active", label: "Active", icon: "Event" },
 *               { value: "inactive", label: "Inactive", icon: "Select" },
 *               { value: "pending", label: "Pending", icon: "Police" },
 *             ]}
 *             icon="StatusIcon"
 *             placeholder="Select Status"
 *             onChange={(e) => setFieldValue("status", e.target.value)}
 *           />
 *         )}
 *       </Field>
 *       <button type="submit">Submit</button>
 *     </Form>
 *   )}
 * </Formik>
 * 
 * // Basic usage
 * <Status
 *   value="active"
 *   options={[
 *     { value: "active", label: "Active", icon: "Event" },
 *     { value: "inactive", label: "Inactive", icon: "Select" },
 *     { value: "pending", label: "Pending", icon: "Police" },
 *   ]}
 *   icon="Event"
 *   placeholder="Select Status"
 * />
 * 
 * // Usage without options
 * <Status value="active" placeholder="Select Status" icon="Search" />
 * 
 * // Usage with only value and placeholder
 * <Status value="active" placeholder="Select Status" />
 * 
 */
const Status = ({
  value,
  options = [],
  icon,
  color = "gray",
  placeholder,
  onChange,
}) => {
  const selectedOption = options.find((option) => option.value === value);
  const baseStyle = `relative inline-flex items-center 
  px-2 py-0.5 rounded-full
  text-sm leading-6 
  transition ease-in-out duration-100
  select-none
  `;

  const statusColor = {
    gray: "bg-body-50 text-body-900 hover:bg-primary-50 active:bg-body-100",
    red: "bg-red-200 text-red-900 hover:bg-red-100 active:bg-red-400",
    green: "bg-green-200 text-green-900 hover:bg-green-100 active:bg-green-400",
  };

  const iconSize = "w-5 h-5";

  const selectClass = classNames(baseStyle, statusColor[color]);
  const iconSide = classNames(iconSize, "mr-1");
  const iconSelect = classNames(iconSize, "ml-1");

  const getValueIcon = () => {
    const status = options.find((status) => status.value === value);
    return status ? status.icon : null;
  };

  return (
    <div className={selectClass}>
      {icon && <Icon name={getValueIcon()} className={iconSide} />}
      <span>{selectedOption ? selectedOption.label : placeholder}</span>
      {options.length > 0 && <Icon name="Select" className={iconSelect} />}
      {options.length > 0 && (
        <select
          className="absolute inset-0 w-full h-full opacity-0"
          value={value}
          onChange={onChange}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

Status.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
    })
  ),
  icon: PropTypes.string,
  color: PropTypes.oneOf(["gray", "red", "green"]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Status;
