import * as React from "react";
const SvgExclamation = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M11 7a1 1 0 1 1 2 0v6a1 1 0 1 1-2 0zM11 17a1 1 0 1 1 2 0 1 1 0 0 1-2 0" />
    <path
      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10m-2 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgExclamation;
