import { ArrowDownUp } from "lucide-react";
import { DEFAULT_ICON_PROPS } from "@/app/tasks/type";

const SortIcon: React.FC = () => {
  return <ArrowDownUp {...DEFAULT_ICON_PROPS} className="m-2" />;
};

export default SortIcon;
