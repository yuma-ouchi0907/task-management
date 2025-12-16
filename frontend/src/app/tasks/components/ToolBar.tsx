import SearchBar from "@/app/tasks/components/SearchBar";
import FilterDropdown from "./FilterDropdown";
import SortDropdown from "./SortDropdown";
import AddButton from "./AddButton";

const Toolbar = () => {
  return (
    <section className="w-100% sticky top-16 grid content-center border-b border-[var(--border-primary)]/50 bg-[var(--bg-base)] leading-12 text-[var(--text-secondary)] lg:pl-48">
      <div className="mx-auto flex h-14 content-center items-center gap-2 lg:mx-0 lg:gap-16">
        <AddButton />
        <SearchBar />
        <FilterDropdown />
        <SortDropdown />
      </div>
    </section>
  );
};

export default Toolbar;
