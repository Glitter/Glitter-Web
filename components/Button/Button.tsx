import React from 'react';

export interface ButtonPropsInterface {
  children: any;
  className?: string;
  color?: 'primary' | 'danger' | 'default' | 'light';
  variant?: 'text' | 'contained';
  size?: 'regular' | 's' | 'lg';
  grow?: boolean;
  type?: 'button' | 'submit';
  htmlAttributes?: {
    [name: string]: string;
  };
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface GetButtonClassNameInputInterface {
  className?: ButtonPropsInterface['className'];
  color?: ButtonPropsInterface['color'];
  size?: ButtonPropsInterface['size'];
  grow?: ButtonPropsInterface['grow'];
  variant?: ButtonPropsInterface['variant'];
}

export const getButtonClassName = ({
  className = '',
  color = 'default',
  size = 'regular',
  grow = true,
  variant = 'contained',
}: GetButtonClassNameInputInterface): string => {
  let colorClasses = '';

  if (variant === 'text') {
    switch (color) {
      case 'primary':
        colorClasses =
          'text-primary-600 hover:text-primary-700 hover:bg-gray-100 focus:text-primary-700 focus:bg-gray-100';
        break;
      case 'danger':
        colorClasses =
          'text-red-600 hover:text-red-700 hover:bg-gray-100 focus:text-red-700 focus:bg-gray-100';
        break;
      case 'light':
        colorClasses =
          'text-gray-200 hover:text-gray-300 hover:bg-gray-800 focus:text-gray-300 focus:bg-gray-900';
        break;
      default:
        colorClasses =
          'text-gray-800 hover:text-gray-900 hover:bg-gray-100 focus:text-gray-900 focus:bg-gray-200';
        break;
    }
  } else {
    // variant === 'contained'
    switch (color) {
      case 'primary':
        colorClasses =
          'text-primary-900 bg-primary-400 hover:bg-primary-500 focus:bg-primary-600';
        break;
      case 'danger':
        colorClasses =
          'text-white bg-red-600 hover:bg-red-700 focus:bg-red-700';
        break;
      default:
        colorClasses =
          'text-gray-800 bg-gray-200 hover:text-gray-900 hover:bg-gray-300 focus:text-gray-900 focus:bg-gray-300';
        break;
    }
  }

  let sizeClasses = '';

  switch (size) {
    case 's':
      sizeClasses = 'text-sm px-3 py-1';

      if (grow === true) {
        sizeClasses = `${sizeClasses} lg:text-base`;
      }
      break;
    case 'lg':
      sizeClasses = 'text-lg px-4 py-2';

      if (grow === true) {
        sizeClasses = `${sizeClasses} lg:text-xl`;
      }
      break;

    default:
      sizeClasses = 'text-base px-4 py-2';

      if (grow === true) {
        sizeClasses = `${sizeClasses} lg:text-lg`;
      }
      break;
  }

  let additionalClasses = '';

  switch (variant) {
    case 'text':
      additionalClasses = 'underline';
      break;
    default:
      break;
  }

  return `inline-block appearance-none transition-colors duration-150 ease-in-out ${colorClasses} ${sizeClasses} ${additionalClasses} ${className} rounded-lg`;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonPropsInterface>(
  (
    {
      children,
      className = '',
      color = 'default',
      size = 'regular',
      grow = true,
      type = 'button',
      onClick = () => {},
      htmlAttributes = {},
      variant = 'contained',
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={getButtonClassName({
          className,
          color,
          size,
          grow,
          variant,
        })}
        type={type}
        onClick={onClick}
        {...htmlAttributes}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
