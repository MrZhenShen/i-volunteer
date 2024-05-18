import React from "react";

const RadioButton = ({ label, name, checked, onChange, value }) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="radio"
        name={name}
        value={value}
        className="size-4 rounded-full border-2 hover:duration-100 ease-in-out border-primary-200 hover:border-primary-100 text-primary-500 hover:text-primary-400"
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2 text-base font-normal leading-6 text-body-900 text-right">
        {label}
      </span>
    </label>
  );
};

export default RadioButton;
