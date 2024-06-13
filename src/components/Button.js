import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Icon from "./Icon";

/**
 * Button component that renders a button with optional icon, variant, and size.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {function} [props.onClick] - The click handler function.
 * @param {string} [props.variant] - The variant of the button. Can be "primary", "secondary", "destructive", or "link".
 * @param {string} [props.size] - The size of the button. Can be "default" or "small".
 * @param {string} [props.icon] - The name of the icon to render.
 * @param {string} [props.iconPosition] - The position of the icon. Can be "start" or "end".
 * @returns {JSX.Element} The rendered button component.
 *
 * @example
 * // Example usage:
 * import Button from './components/Button';
 *
 * function App() {
 *   return (
 *     <div>
 *       <Button onClick={() => alert('Clicked!')} variant="primary" size="default" icon="Add" iconPosition="start">
 *         Default
 *       </Button>
 *       <Button onClick={() => alert('Clicked!')} variant="secondary" size="small" icon="Add" iconPosition="end">
 *         Small
 *       </Button>
 *     </div>
 *   );
 * }
 */
const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "default",
  icon,
  iconPosition = "start",
  classNameExtended,
  ...props
}) => {
  const baseStyles =
    "rounded-md hover:duration-100 ease-in-out inline-flex items-center justify-center gap-1";

  const variants = {
    primary:
      "bg-primary-500 text-primary-0 " +
      "hover:bg-primary-400 " +
      "active:bg-primary-700 " +
      "disabled:bg-primary-200 ",
    secondary:
      "bg-primary-50 text-primary-400 " +
      "hover:bg-body-50 " +
      "active:bg-primary-100 ",
    destructive:
      "border-2 border-red-800 text-red-800 " +
      "hover:border-red-700 hover:text-red-700 " +
      "active:border-red-900 active:text-red-900 ",
    link: "text-primary-400 hover:bg-body-50 active:bg-primary-100 ",
  };

  const buttonSizes = {
    default: "py-2 px-4 text-base",
    small: "py-1 px-3 text-sm",
  };

  const iconSizes = {
    default: "size-6",
    small: "size-5",
  };

  const buttonClass = classNames(
    baseStyles,
    variants[variant],
    buttonSizes[size],
    classNameExtended,
  );
  const iconClass = classNames(baseStyles, iconSizes[size]);

  return (
    <button onClick={onClick} className={buttonClass} type="button" {...props}>
      {icon && iconPosition === "start" && (
        <Icon name={icon} className={iconClass} />
      )}
      <span>{children}</span>
      {icon && iconPosition === "end" && (
        <Icon name={icon} className={iconClass} />
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary", "destructive", "link"]),
  size: PropTypes.oneOf(["default", "small"]),
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(["start", "end"]),
  classNameExtended: PropTypes.string,
};

export default Button;
