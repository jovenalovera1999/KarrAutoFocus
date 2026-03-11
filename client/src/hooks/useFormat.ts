import { UserColumns } from "@/interfaces/UserInterface";

export const useFormat = () => {
  const handleFullNameFormat = (user?: UserColumns | null) => {
    if (!user) return "";

    const middleInitial = user.middle_name ? `${user.middle_name?.[0]}.` : "";
    const suffix = user.suffix_name ?? "";

    return `${user.last_name ?? ""}, ${user.first_name ?? ""} ${middleInitial} ${suffix}`.trim();
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

  const handleDateTimeFormat = (dateTime: string) => {
    if (!dateTime) return null;

    const newDateTime = new Date(dateTime);

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(newDateTime);
  };

  const handleCommaInNumbersOnTypingFormat = (
    value?: string | number | null,
  ): string => {
    if (value === null || value === undefined) return "";

    // Force string
    const stringValue = String(value);

    if (stringValue.trim() === "") return "";

    // Remove existing commas safely
    const cleaned = stringValue.replace(/,/g, "");

    // If it's just ".", allow it while typing
    if (cleaned === ".") return "0.";

    const parts = cleaned.split(".");
    const integerPart = parts[0] ?? "";
    const decimalPart = parts[1];

    // Prevent NaN formatting
    if (integerPart === "" || isNaN(Number(integerPart))) {
      return cleaned;
    }

    const formattedInteger = Number(integerPart).toLocaleString("en-US");

    return decimalPart !== undefined
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;
  };

  const handleNumberDecimalFormat = (number: string | number) => {
    return new Intl.NumberFormat("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(number));
  };

  return {
    handleFullNameFormat,
    handleDateFormat,
    handleDateTimeFormat,
    handleCommaInNumbersOnTypingFormat,
    handleNumberDecimalFormat,
  };
};
