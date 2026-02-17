"use client";

import React, { ChangeEvent, ReactNode, FC } from "react";

interface SelectProps {
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  disabled?: boolean;
  success?: boolean;
  required?: boolean;
  children: ReactNode;
  errors?: string[];
}

const Select: FC<SelectProps> = ({
  name,
  value,
  onChange,
  className = "",
  disabled = false,
  success = false,
  children,
  errors,
}) => {
  let selectClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 cursor-pointer ${className}`;

  // Same priority logic as Input
  if (disabled) {
    selectClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (errors && errors.length > 0) {
    selectClasses += ` text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10 dark:text-error-400 dark:border-error-500`;
  } else if (success) {
    selectClasses += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300 dark:text-success-400 dark:border-success-500`;
  } else {
    selectClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
  }

  return (
    <div className="relative">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={selectClasses}
      >
        {children}
      </select>

      {errors && errors.length > 0 && (
        <div>
          <span className="text-error-500 text-xs">{errors[0]}</span>
        </div>
      )}
    </div>
  );
};

export default Select;
