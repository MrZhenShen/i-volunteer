import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import classNames from 'classnames';
import Icon from './Icon';

const Select = ({
  label,
  placeholder,
  footnote,
  size = 'default',
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
    default: 'py-2 px-4 text-base',
    small: 'py-1 px-3 text-sm',
  };

  const labelSizes = {
    default: 'text-base leading-6',
    small: 'text-sm leading-5',
  };

  const iconSizes = {
    default: 'w-6 h-6',
    small: 'w-5 h-5',
  };

  const selectClass = classNames(baseSelectStyles, selectSizes[size]);
  const labelClass = classNames('block text-body-900', labelSizes[size]);
  const iconClass = classNames('text-body-900', iconSizes[size]);

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
          <option value="" disabled selected>{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pr-3">
            <Icon name="chevron-down" className={iconClass} />
          </div>
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
  size: PropTypes.oneOf(['default', 'small']),
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default Select;
