import SearchInput from "./SearchInput";
import { SearchIcon } from "@/app/tasks/components/icons";

const SearchBar: React.FC = () => {
  return (
    <label className="flex h-10 cursor-text items-center rounded-md border border-[var(--border-primary)] bg-[var(--bg-surface)] transition focus-within:border-[var(--color-primary)]">
      <SearchIcon />
      <SearchInput placeholder="タスクタイトルで検索" />
    </label>
  );
};

export default SearchBar;
