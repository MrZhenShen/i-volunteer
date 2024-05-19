import { useField } from "formik";
import React from "react";

/**
 * RadioButton component that renders a radio button with an optional label.
 * 
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.label - The label for the radio button.
 * @param {string} props.name - The name of the radio button group.
 * @param {boolean} props.checked - The checked state of the radio button.
 * @param {string} props.value - The value of the radio button.
 * @returns {JSX.Element} The rendered radio button component.
 * 
 * @example
 * // Example usage:
 * import RadioButton from './components/RadioButton';
 * 
 * function App() {
 *   const [selectedValue, setSelectedValue] = React.useState('option1');
 * 
 *   const handleChange = (event) => {
 *     setSelectedValue(event.target.value);
 *   };
 * 
 *   return (
 *     <div>
 *       <RadioButton 
 *         label="Option 1" 
 *         name="options" 
 *         value="option1" 
 *         checked={selectedValue === 'option1'} 
 *         onChange={handleChange} 
 *       />
 *       <RadioButton 
 *         label="Option 2" 
 *         name="options" 
 *         value="option2" 
 *         checked={selectedValue === 'option2'} 
 *         onChange={handleChange} 
 *       />
 *     </div>
 *    <Formik>
 *      <Form>
 *        <Field
 *            name="gender"
 *            label="Male"
 *            value="male"
 *            component={RadioButton}
 *          />
 *          <Field
 *            name="gender"
 *            label="Female"
 *            value="female"
 *            component={RadioButton}
 *          />
 *      </Form>
 *    </Formik>
 *   );
 * }
 */
const RadioButton = ({ field, label, ...props }) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="radio"
        {...field}
        {...props}
        className="size-4 rounded-full border-2 hover:duration-100 ease-in-out border-primary-200 hover:border-primary-100 text-primary-500 hover:text-primary-400"
      />
      <span className="ml-2 text-base font-normal leading-6 text-body-900 text-right">
        {label}
      </span>
    </label>
  );
};

export default RadioButton;
