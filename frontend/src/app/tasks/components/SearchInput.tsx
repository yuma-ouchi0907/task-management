import { SearchContext } from "@/app/page";
import { useContext } from "react";

type Props = {
  placeholder?: string;
};

const SearchInput = ({ placeholder = "検索" }: Props) => {
  const [query, setQuery] = useContext(SearchContext);
  return (
    <input
      type="text"
      value={query}
      placeholder={placeholder}
      onChange={(e) => setQuery(e.target.value)}
      className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none"
    />
  );
};

export default SearchInput;
