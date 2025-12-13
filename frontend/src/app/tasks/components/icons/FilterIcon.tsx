import { ListFilter } from "lucide-react";
import { DEFAULT_ICON_PROPS } from "@/app/tasks/type";
const FilterIcon: React.FC = () => {
  return <ListFilter {...DEFAULT_ICON_PROPS} className="m-2" />;
};

export default FilterIcon;
