import React from "react";

const CheckBox = ({ label, checked, onChange }) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="size-4 rounded border-2 hover:duration-100 ease-in-out border-primary-200 hover:border-primary-100 text-primary-500 hover:text-primary-400"
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2 font-eukraine text-base font-normal leading-6 text-body-900 text-right">
        {label}
      </span>
    </label>
  );
};

export default CheckBox;
