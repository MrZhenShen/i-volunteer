import * as React from "react";
const SvgCheckmark = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="m7.414 10.828 4.243 4.243-1.414 1.414L6 12.243z" />
    <path d="m17.314 9.414-7.071 7.071-1.415-1.414L15.9 8z" />
  </svg>
);
export default SvgCheckmark;
