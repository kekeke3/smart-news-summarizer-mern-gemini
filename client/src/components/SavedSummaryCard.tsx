const SavedSummaryCard = ({ summary }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium text-primary">
          {summary.source}
        </span>
        <span className="text-xs text-gray-500">
          Saved on {new Date(summary.savedAt).toLocaleDateString()}
        </span>
      </div>

      <h3 className="text-xl font-bold text-dark mb-3">{summary.title}</h3>
      <div className="bg-light p-4 rounded-lg mb-4">
        <p className="text-gray-700">{summary.summary}</p>
      </div>

      <div className="flex justify-between items-center">
        <a
          href={summary.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-secondary hover:underline"
        >
          View Original
        </a>

        <div className="flex space-x-2">
          <button className="p-2 text-gray-500 hover:text-alert transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:text-primary transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedSummaryCard;
