import React, { FC } from "react";

interface InputProps {
  type: "text" | "number" | "email" | "password" | "date" | "time" | string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  autoFocus?: boolean;
  min?: string;
  max?: string;
  step?: number;
  readOnly?: boolean;
  disabled?: boolean;
  success?: boolean;
  // hint?: string; // Optional hint text
  errors?: string[];
}

const Input: FC<InputProps> = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  className = "",
  autoFocus,
  min,
  max,
  step,
  readOnly = false,
  disabled = false,
  success = false,
  // hint,
  errors,
}) => {
  // Determine input styles based on state (disabled, success, error)
  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`;

  // Add styles for the different states
  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (errors && errors?.length > 0) {
    inputClasses += ` border-error-500 focus:ring-3 focus:ring-error-500/10 dark:border-error-500`;
  } else if (success) {
    inputClasses += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300  dark:text-success-400 dark:border-success-500`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
  }

  return (
    <div className="relative">
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        min={min}
        max={max}
        step={step}
        readOnly={readOnly}
        disabled={disabled}
        className={inputClasses}
      />

      {errors && errors.length > 0 && (
        <div>
          <span className="text-error-500 text-xs">{errors[0]}</span>
        </div>
      )}

      {/* Optional Hint Text */}
      {/* {hint && (
        <p
          className={`mt-1.5 text-xs ${
            errors
              ? "text-error-500"
              : success
                ? "text-success-500"
                : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )} */}
    </div>
  );
};

export default Input;
