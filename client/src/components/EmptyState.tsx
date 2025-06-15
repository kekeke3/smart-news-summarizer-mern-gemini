const EmptyState = ({ icon, title, description }) => {
  return (
    <div className="bg-light rounded-lg p-8 text-center">
      <div className="mx-auto mb-4 text-gray-400">{icon}</div>
      <h3 className="text-lg font-medium text-dark mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default EmptyState;
