import { UserColumns } from "@/interfaces/UserInterface";
import { ChangeEvent, useState } from "react";

export const useFormat = () => {
  const handleFullNameFormat = (user: UserColumns) => {
    const middleInitial = user.middle_name ? `${user.middle_name[0]}.` : "";
    const suffix = user.suffix_name ? `${user.suffix_name}` : "";

    return `${user.last_name}, ${user.first_name} ${middleInitial} ${suffix}`;
  };

  const handleDateFormat = (date: string): string => {
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) return "";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(parsedDate);
  };

  const handleCommaInNumbersFormat = (value: string) => {
    if (!value) {
      return "";
    }

    const [integerPart, decimalPart] = value.split(".");

    const formattedInteger = Number(
      integerPart.replace(/,/g, ""),
    ).toLocaleString("en-US");

    if (decimalPart !== undefined) {
      return `${formattedInteger}.${decimalPart}`;
    }

    return formattedInteger;
  };

  return {
    handleFullNameFormat,
    handleDateFormat,
    handleCommaInNumbersFormat,
  };
};
