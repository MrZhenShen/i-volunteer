import React from 'react';
import * as Icons from './icons';

/**
 * Generic Icon component that dynamically renders an SVG icon based on the provided name.
 * 
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.name - The name of the icon to render. This should match the exported name of the SVG component in the icons directory.
 * @param {string} [props.className] - Additional CSS classes to apply to the SVG element.
 * @param {Object} [props.style] - Inline styles to apply to the SVG element.
 * @returns {JSX.Element|null} The rendered SVG icon component or null if the icon name is not found.
 * 
 * @example
 * // Example usage:
 * import Icon from './components/Icon';
 * 
 * function App() {
 *   return (
 *     <div>
 *       <Icon name="Left" className="w-6 h-6 text-gray-500" />
 *       <Icon name="Add" className="w-8 h-8 text-blue-500" />
 *     </div>
 *   );
 * }
 */
const Icon = ({ name, className, style, ...props }) => {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    console.warn(`Icon component with name "${name}" does not exist.`);
    return null;
  }

  return <IconComponent className={className} style={style} {...props} />;
};

export default Icon;
