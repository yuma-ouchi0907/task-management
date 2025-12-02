import { SearchContext } from "@/app/tasks/page";
import { useContext } from "react";

type Props = {
  placeholder?: string;
};

const SearchInput = ({ placeholder = "検索" }: Props) => {
  const [searchKeyword, setSearchKeyword] = useContext(SearchContext);
  return (
    <input
      type="text"
      value={searchKeyword}
      placeholder={placeholder}
      onChange={(e) => setSearchKeyword(e.target.value)}
      className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-secondary)] hover:opacity-80 focus:outline-none"
    />
  );
};

export default SearchInput;
