import { FiCircle, FiLoader, FiCheckCircle } from "react-icons/fi";
import { STATUS_ICON_CLASSES } from "../../constants";

export function StatusIcons({ status }) {
  const iconMap = {
    todo: <FiCircle className={STATUS_ICON_CLASSES.todo} />,
    inProgress: <FiLoader className={STATUS_ICON_CLASSES.inProgress} />,
    done: <FiCheckCircle className={STATUS_ICON_CLASSES.done} />,
  };

  return iconMap[status] || iconMap.todo;
} 