import { Trash2 } from "lucide-react";
import { DEFAULT_ICON_PROPS } from "@/app/tasks/type";

const TrashIcon: React.FC = () => {
  return <Trash2 {...DEFAULT_ICON_PROPS} className="m-2" />;
};

export default TrashIcon;
