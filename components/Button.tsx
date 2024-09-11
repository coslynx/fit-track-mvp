import { useState } from 'react';
import cn from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className,
  disabled,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    onClick?.();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={cn(
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
        className
      )}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;