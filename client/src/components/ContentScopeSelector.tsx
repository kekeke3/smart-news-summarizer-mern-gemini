const ContentScopeSelector = ({ selected, onChange }) => {
  const contentScope = [
    { value: "everything", label: "Everything" },
    { value: "top-headlines", label: "Top headlines" },
  ];

  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
    >
      {contentScope.map((scope) => (
        <option key={scope.value} value={scope.value}>
          {scope.label}
        </option>
      ))}
    </select>
  );
};

export default ContentScopeSelector;
