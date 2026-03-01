"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type TabContextType = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const TabContext = createContext<TabContextType | null>(null);

function useTab() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("Tab components must be used inside <Tab />");
  }
  return context;
}

interface TabProps {
  children: ReactNode;
  defaultValue: string;
}

function Tab({ children, defaultValue }: TabProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-8 dark:border-white/5 dark:bg-white/3">
          {children}
        </div>
      </div>
    </TabContext.Provider>
  );
}

function TabList({ children }: { children: ReactNode }) {
  return (
    <div className="border-b border-gray-200 dark:border-white/5 overflow-scroll">
      <div className="flex gap-4 md:gap-8">{children}</div>
    </div>
  );
}

interface TabTriggerProps {
  children: ReactNode;
  value: string;
}

function TabTrigger({ children, value }: TabTriggerProps) {
  const { activeTab, setActiveTab } = useTab();
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`relative pb-4 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "text-brand-600 dark:text-brand-400"
          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      }`}
    >
      {children}

      {isActive && (
        <span className="absolute left-0 bottom-0 h-0.5 w-full bg-brand-600 dark:bg-brand-400" />
      )}
    </button>
  );
}

interface TabContentProps {
  children: ReactNode;
  value: string;
}

function TabContent({ children, value }: TabContentProps) {
  const { activeTab } = useTab();

  if (activeTab !== value) return null;

  return <div className="pt-8 bg-transparent">{children}</div>;
}

Tab.List = TabList;
Tab.Trigger = TabTrigger;
Tab.Content = TabContent;

export default Tab;
