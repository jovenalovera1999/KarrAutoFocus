import React, { ChangeEvent } from "react";

interface TextareaProps {
  name?: string;
  placeholder?: string; // Placeholder text
  rows?: number; // Number of rows
  value?: string; // Current value
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void; // Change handler
  className?: string; // Additional CSS classes
  disabled?: boolean; // Disabled state
  error?: boolean; // Error state
  hint?: string; // Hint text to display
  errors?: string[];
}

const TextArea: React.FC<TextareaProps> = ({
  name,
  placeholder = "", // Default placeholder
  rows = 3, // Default number of rows
  value = "", // Default value
  onChange, // Callback for changes
  className = "", // Additional custom styles
  disabled = false, // Disabled state
  error = false, // Error state
  hint = "", // Default hint text
  errors,
}) => {
  let textareaClasses = `
  w-full rounded-lg border appearance-none
  px-4 py-2.5 text-sm shadow-theme-xs
  placeholder:text-gray-400
  focus:outline-hidden focus:ring-3
  dark:bg-gray-900 dark:text-white/90
  dark:placeholder:text-white/30
  ${className}
`;

  // Apply state styles
  if (disabled) {
    textareaClasses += `
    text-gray-500 border-gray-300 cursor-not-allowed
    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700
  `;
  } else if (errors && errors?.length > 0) {
    textareaClasses += ` border-error-500 focus:ring-error-500/10 dark:border-error-500
  `;
  } else {
    textareaClasses += `
    bg-transparent text-gray-800 border-gray-300
    focus:border-brand-300
    focus:ring-brand-500/10
    dark:border-gray-700 dark:bg-gray-900
    dark:text-white/90
    dark:focus:border-brand-800
  `;
  }

  return (
    <div className="relative">
      <textarea
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={textareaClasses}
      />

      {errors && errors.length > 0 && (
        <div>
          <span className="text-error-500 text-xs">{errors[0]}</span>
        </div>
      )}

      {hint && (
        <p
          className={`mt-2 text-sm ${
            error ? "text-error-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default TextArea;
