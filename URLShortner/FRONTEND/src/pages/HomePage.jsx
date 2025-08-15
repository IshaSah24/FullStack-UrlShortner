import { useEffect, useState } from "react";
import UrlShortened from "../components/UrlShortened";
import ShortnerForm from "../components/ShortnerForm";

import { createShortUrl } from "../apis/shortUrl.api";
import { useRouter } from "@tanstack/react-router";
import { useAuth } from "../context/authContext";

const HomePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.navigate({ to: "/auth" });
    }
  }, [loading, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!originalUrl) {
      setError("Please enter a URL");
      return;
    }

    try {
      new URL(originalUrl);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    //  calling the backend api
    try {
      const { data } = await createShortUrl(originalUrl);
      console.log("Response:", data);
      setShortenedUrls((prev) => [data, ...prev]);
      console.log(shortenedUrls);

      setOriginalUrl("");
      setError("");
    } catch (err) {
      console.error("Error from backend:", err);
      setError("Failed to shorten URL. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex shadow-xl items-center justify-center px-4">
      <div className=" flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-indigo-600">
              URL Shortener
            </h1>
            <p className="mt-2 text-gray-500 text-sm">
              Paste a long URL to get a shorter version you can easily share
            </p>
          </div>

          <ShortnerForm
            handleSubmit={handleSubmit}
            error={error}
            originalUrl={originalUrl}
            setOriginalUrl={setOriginalUrl}
          />

          {shortenedUrls.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Your Shortened URLs
              </h2>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {shortenedUrls.map((url) => (
                  <UrlShortened
                    key={url.id}
                    originalUrl={url.full_url}
                    shortUrl={url.short_url}
                    clicks={url.clicks}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
