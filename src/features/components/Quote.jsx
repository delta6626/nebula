import { Feather, RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useQuoteStore } from "../../store/quoteStore";

function Quote() {
  const { quotes } = useQuoteStore();
  const [currentQuote, setCurrentQuote] = useState();
  const [loading, setLoading] = useState(false);

  const getRandomQuote = useCallback(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, [quotes]);

  function handleRefreshClick() {
    setLoading(true);
    setCurrentQuote(getRandomQuote());
    setLoading(false);
  }

  useEffect(() => {
    setCurrentQuote(getRandomQuote());
  }, [getRandomQuote]);

  return (
    <div className="bg-transparent border-1 border-accent mt-4 w-sm mx-auto rounded-lg p-4">
      <div className="flex justify-between text-secondary">
        <h1 className="flex items-center gap-2 font-semibold">
          <Feather />
          Motivation
        </h1>
        <button className="btn text-secondary" onClick={handleRefreshClick}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            <RefreshCcw />
          )}
        </button>
      </div>
      <div className="mt-4">
        <h1>{currentQuote?.quote}</h1>
        <p className="mt-2 text-secondary">— {currentQuote?.author}</p>
      </div>
    </div>
  );
}

export default Quote;
