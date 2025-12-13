import { Calendar } from "lucide-react";
import { DEFAULT_ICON_PROPS } from "@/app/tasks/type";

const CalendarIcon: React.FC = () => {
  return (
    <Calendar
      {...DEFAULT_ICON_PROPS}
      className="text-[var(--text-secondary)]"
    />
  );
};

export default CalendarIcon;
