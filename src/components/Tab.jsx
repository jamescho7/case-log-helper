import React, { useState } from 'react';

const Tab = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div className="w-full py-4">
      <div className="flex justify-start">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`py-2 px-4 text-center focus:outline-none uppercase font-bold ${
              activeTab === tab.label
                ? 'underline text-blue-500 bg-slate-900'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.map((tab) =>
          activeTab === tab.label ? (
            <div key={tab.label} className="p-4 bg-slate-900">
              {tab.content}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Tab;