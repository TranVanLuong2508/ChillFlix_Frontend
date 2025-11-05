import { format } from "date-fns";
import { vi } from "date-fns/locale";

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return "Không rõ";
  try {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
  } catch {
    return "Không rõ";
  }
};
