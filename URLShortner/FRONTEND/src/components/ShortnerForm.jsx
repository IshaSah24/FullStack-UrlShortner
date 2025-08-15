import React from "react";

const ShortnerForm = ({handleSubmit, error, originalUrl, setOriginalUrl}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="url"
          value={originalUrl}
          onChange={(e) => {
            setOriginalUrl(e.target.value);
          }}
          placeholder="https://example.com/your-long-url"
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>

      <button
        type="submit"
        className={`w-full py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition`}
      >
       Shorten URL
      </button>
    </form>
  );
};

export default ShortnerForm;
