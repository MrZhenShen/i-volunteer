import React from "react";

/**
 * CheckBox component that renders a checkbox with an optional label.
 * 
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.label - The label for the checkbox.
 * @param {boolean} props.checked - The checked state of the checkbox.
 * @param {function} props.onChange - The change handler function.
 * @returns {JSX.Element} The rendered checkbox component.
 * 
 * @example
 * // Example usage:
 * import CheckBox from './components/CheckBox';
 * 
 * function App() {
 *   const [checked, setChecked] = React.useState(false);
 * 
 *   const handleChange = (event) => {
 *     setChecked(event.target.checked);
 *   };
 * 
 *   return (
 *     <div>
 *       <CheckBox label="Accept Terms and Conditions" checked={checked} onChange={handleChange} />
 *     </div>
 *   );
 * }
 */
const CheckBox = ({ label, checked, onChange }) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="size-4 rounded border-2 hover:duration-100 ease-in-out border-primary-200 hover:border-primary-100 text-primary-500 hover:text-primary-400"
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2 text-base font-normal leading-6 text-body-900 text-right">
        {label}
      </span>
    </label>
  );
};

export default CheckBox;
