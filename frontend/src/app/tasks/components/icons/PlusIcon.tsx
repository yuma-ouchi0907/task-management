import { Plus } from "lucide-react";
import { DEFAULT_ICON_PROPS } from "@/app/tasks/type";

const PlusIcon: React.FC = () => {
  return <Plus {...DEFAULT_ICON_PROPS} className="m-2" />;
};

export default PlusIcon;
