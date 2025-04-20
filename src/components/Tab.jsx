

const Tab = ({ tabs, activeTab, setActiveTab }) => {

  return (
    <div className="w-full pt-4">
      <div className="flex justify-start">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`py-2 px-4 text-center focus:outline-none uppercase font-bold ${
              activeTab === tab.label
                ? 'underline text-blue-500 bg-slate-900 border-blue-400 border-t-2'
                : 'text-gray-500 bg-slate-800 border-slate-600 border-t-2'
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