import SearchBar from "@/app/tasks/components/SearchBar";
import FilterMenu from "./FilterMenu";
import SortMenu from "./SortMenu";

const Toolbar = () => {
  return (
    <section className="text-l grid w-screen content-center border-b border-[var(--border-primary)]/50 bg-[var(--bg-base)] px-45 leading-12 text-[var(--text-secondary)]">
      <div className="flex h-14 content-center gap-8">
        <SearchBar />
        <FilterMenu />
        <SortMenu />
      </div>
    </section>
  );
};

export default Toolbar;
