import { UserColumns } from "@/interfaces/UserInterface";

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

  return { handleFullNameFormat, handleDateFormat };
};
