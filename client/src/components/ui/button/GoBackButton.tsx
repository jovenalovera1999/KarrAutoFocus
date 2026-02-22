import useGoBack from "@/hooks/useGoBack";
import { ChevronLeftIcon } from "@/icons";

export default function GoBackButton() {
  const goBack = useGoBack();

  return (
    <>
      <div className="w-full max-w-md sm:pt-10 mb-4">
        <button
          onClick={goBack}
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back
        </button>
      </div>
    </>
  );
}
