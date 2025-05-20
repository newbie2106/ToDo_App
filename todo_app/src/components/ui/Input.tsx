import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  const { theme } = useTheme();
  
  const darkModeClasses = theme === 'dark' 
    ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500' 
    : '';
  
  return (
    <input
      className={`${className} ${darkModeClasses} transition-colors duration-200`}
      {...props}
    />
  );
};

export default Input;