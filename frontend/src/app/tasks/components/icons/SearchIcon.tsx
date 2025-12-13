import { Search } from "lucide-react";
import { DEFAULT_ICON_PROPS } from "@/app/tasks/type";

const SearchIcon: React.FC = () => {
  return <Search {...DEFAULT_ICON_PROPS} className="m-2" />;
};

export default SearchIcon;
