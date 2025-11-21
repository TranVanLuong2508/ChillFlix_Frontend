import { format } from "date-fns";
import { vi } from "date-fns/locale";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

dayjs.locale("vi");

export const formatTimeFromNowVN = (date: string | Date) => {
  return dayjs(date).tz("Asia/Ho_Chi_Minh").fromNow();
};

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return "Không rõ";
  try {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
  } catch {
    return "Không rõ";
  }
};
