import { ArrowUpIcon } from "@/icons";
import { useEffect, useState } from "react";

export default function GoToTopButton() {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    setVisible(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        onClick={handleScrollToTop}
        className={`fixed bottom-6 right-6 z-40 rounded-full p-3 shadow-lg text-white bg-brand-500 hover:bg-brand-600 dark:bg-brand-800 dark:hover:bg-brand-900 transition-all duration-300 ${visible ? "opacity-100 translate-y-0 cursor-pointer" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <ArrowUpIcon />
      </button>
    </>
  );
}
