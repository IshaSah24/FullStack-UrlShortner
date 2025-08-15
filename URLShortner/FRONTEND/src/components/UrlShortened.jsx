import { useState } from 'react';

const UrlShortened = ({ originalUrl, shortUrl, clicks }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="truncate flex-1">
          <p className="text-sm text-gray-500 truncate">{originalUrl}</p>
          <a 
            href={shortUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium truncate block"
            /* 
            For production:
            - we might want to  track clicks here
            - Could call a backend endpoint to increment click count
            */
            onClick={() => {
              // Example: fetch(`/api/clicks/${urlId}`, { method: 'POST' });  // like this <-
            }}
          >
            {shortUrl}
          </a>
        </div>
        <button
          onClick={handleCopy}
          className="ml-2 px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <p className="mt-1 text-xs text-gray-400">{clicks} clicks</p>
    </div>
  );
};

export default UrlShortened;