interface CategorySelectorProps {
  selected: string;
  onChange: (category: string) => void;
}

const CategorySelector = ({ selected, onChange }: CategorySelectorProps) => {
  const categories = [
    { value: "general", label: "General" },
    { value: "business", label: "Business" },
    { value: "technology", label: "Technology" },
    { value: "health", label: "Health" },
    { value: "science", label: "Science" },
    { value: "sports", label: "Sports" },
    { value: "entertainment", label: "Entertainment" },
  ];

  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
    >
      {categories.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  );
};

export default CategorySelector;