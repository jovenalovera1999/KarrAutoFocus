"use client";

import React, { ChangeEvent, ReactNode, useState } from "react";

interface SelectProps {
  name: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  className?: string;
  required?: boolean;
  children: ReactNode;
  errors?: string[];
}

const Select: React.FC<SelectProps> = ({
  name,
  children,
  onChange,
  className,
  value,
  errors,
}) => {
  return (
    <>
      <select
        className={`h-11 w-full appearance-none rounded-lg border border-gray-300  px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-800 ${className}`}
        name={name}
        id={name}
        onChange={onChange}
        value={value}
      >
        {children}
      </select>
      {errors && errors.length > 0 && (
        <span className="text-red-500 text-xs">{errors[0]}</span>
      )}
    </>
  );
};

export default Select;
