import { ChevronDown } from "lucide-react";
import { DEFAULT_ICON_PROPS } from "@/app/tasks/type";

const DropdownIcon: React.FC = () => {
  return <ChevronDown {...DEFAULT_ICON_PROPS} />;
};

export default DropdownIcon;
