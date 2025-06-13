const QUOTE_REPOSITORY =
  "https://raw.githubusercontent.com/delta6626/nebula-quotes/refs/heads/main/quotes.json";

export default function fetchAllQuotes() {
  return fetch(QUOTE_REPOSITORY);
}
