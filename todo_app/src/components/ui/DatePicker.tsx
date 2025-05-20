import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    label?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ className = '', label, ...props }) => {
    const { theme } = useTheme();

    const darkModeClasses = theme === 'dark'
        ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        : '';

    const labelClasses = theme === 'dark'
        ? 'text-gray-200'
        : 'text-gray-700';

    return (
        <div className="flex flex-col">
            {label && <label className={`mb-1 text-sm font-medium ${labelClasses}`}>{label}</label>}
            <input
                type="datetime-local"
                className={`px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className} ${darkModeClasses} transition-colors duration-200`}
                {...props}
            />
        </div>
    );
};

export default DatePicker;