import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className = '', children, ...props }) => {
  const { theme } = useTheme();
  
  const darkModeClasses = theme === 'dark' 
    ? 'dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600' 
    : '';
  
  return (
    <button
      className={`${className} ${darkModeClasses} transition-colors duration-200`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;