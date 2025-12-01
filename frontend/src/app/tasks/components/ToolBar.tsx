import SearchBar from "@/app/tasks/components/SearchBar";
import FilterDropdown from "./FilterDropdown";
import SortDropdown from "./SortDropdown";

const Toolbar = () => {
  return (
    <section className="text-l sticky top-14 grid w-screen content-center border-b border-[var(--border-primary)]/50 bg-[var(--bg-base)] px-48 leading-12 text-[var(--text-secondary)]">
      <div className="flex h-14 content-center items-center gap-18">
    <section className="text-l sticky top-14 grid w-screen content-center border-b border-[var(--border-primary)]/50 bg-[var(--bg-base)] px-45 leading-12 text-[var(--text-secondary)]">
      <div className="flex h-14 content-center gap-18">
        <SearchBar />
        <FilterDropdown />
        <SortDropdown />
      </div>
    </section>
  );
};

export default Toolbar;
